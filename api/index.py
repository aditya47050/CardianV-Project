import os
import sys
from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

# Ensure the local api/ directory is present in sys.path for Vercel execution
sys.path.append(os.path.dirname(__file__))

from audio import preprocess_audio
from model import HeartbeatModelInference

app = FastAPI(
    title="Heartbeat Anomaly Detector Inference API",
    description="Pretrained PCG Heartbeat Sound Anomaly Detector (ai-mitra/heartbeat-anomaly-detector)",
    version="1.0.0"
)

# Enable CORS for Next.js app communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Pretrained Model Evaluator at module level for warm serverless reuse
model_evaluator = HeartbeatModelInference()


@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "Heartbeat Anomaly Detector API",
        "modelLoaded": model_evaluator.is_loaded,
        "modelConfigured": model_evaluator.is_loaded,
        "checkpointPath": model_evaluator.checkpoint_path
    }


@app.post("/predict")
@app.post("/api/predict")
async def predict_heart_sound(file: UploadFile = File(...)):
    # 1. Validate audio file submission
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No audio file uploaded in the request payload."
        )

    ext = os.path.splitext(file.filename)[1].lower()
    valid_exts = {".wav", ".mp3", ".m4a", ".ogg", ".flac"}
    if ext not in valid_exts and not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Accepted formats: WAV, MP3, M4A, OGG, FLAC."
        )

    # 2. Check if pretrained model checkpoint is loaded
    if not model_evaluator.is_loaded:
        return {
            "success": False,
            "modelConfigured": False,
            "status": "Model Checkpoint Pending",
            "error": f"Pretrained weights file (heartbeat-anomaly-detector-model.pt) not found in {model_evaluator.checkpoint_path}."
        }

    # 3. Read uploaded audio binary
    try:
        audio_bytes = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to read audio file binary: {str(e)}"
        )

    # 4. Preprocess audio: mono, 2000Hz resampling, peak norm, 60k samples
    try:
        audio_tensor, original_duration_seconds = preprocess_audio(audio_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Audio preprocessing error: {str(e)}"
        )

    # 5. Execute Model Inference (eval mode, torch.no_grad)
    try:
        results = model_evaluator.predict(audio_tensor)
        pred_idx = results["predicted_index"]
        pred_class_name = results["predicted_class_name"]

        # Class 0 -> Normal; Classes 1, 2, 3 -> Abnormal
        if pred_idx == 0:
            label = "Normal"
            diagnostic_status = "No Abnormalities Detected"
            confidence = results["p_normal"] * 100.0
        else:
            label = "Abnormal"
            diagnostic_status = "Abnormal Heart Sound Detected"
            confidence = results["p_abnormal_total"] * 100.0

        return {
            "success": True,
            "modelConfigured": True,
            "label": label,
            "status": diagnostic_status,
            "confidence": round(confidence, 1),
            "durationSeconds": original_duration_seconds,
            "modelClass": pred_class_name,
            "modelClassIndex": pred_idx,
            "details": f"Inference by ai-mitra/heartbeat-anomaly-detector (Raw waveform 2kHz). Class: '{pred_class_name}' (Normal={round(results['p_normal']*100, 1)}%, Murmur={round(results['p_murmur']*100, 1)}%, Extra={round(results['p_extra']*100, 1)}%, Artifact={round(results['p_artifact']*100, 1)}%)."
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Model inference processing error: {str(e)}"
        )
