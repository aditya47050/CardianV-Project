# Pretrained Heartbeat Anomaly Detector Inference Backend

This directory contains the dedicated **PyTorch** model inference backend built with **FastAPI**, integrated with the pretrained **`ai-mitra/heartbeat-anomaly-detector`** phonocardiogram (PCG) classification model.

---

## 1. Model Overview & Checkpoint Placement

* **Model Source**: Hugging Face [`ai-mitra/heartbeat-anomaly-detector`](https://huggingface.co/ai-mitra/heartbeat-anomaly-detector)
* **Checkpoint Download URL**: [`https://huggingface.co/ai-mitra/heartbeat-anomaly-detector/resolve/main/heartbeat-anomaly-detector-model.pt`](https://huggingface.co/ai-mitra/heartbeat-anomaly-detector/resolve/main/heartbeat-anomaly-detector-model.pt)
* **Expected Local Placement**:

```
backend/checkpoints/heartbeat-anomaly-detector-model.pt
```

*(Do not commit binary `.pt` files to Git. Download the model file and place it locally in `backend/checkpoints/` before running).*

---

## 2. Model Architecture & Preprocessing

### Architecture: 4-Layer 1D CNN
```
conv1: Conv1D(1 -> 32, kernel_size=50, padding=25) -> BatchNorm1d -> ReLU -> MaxPool1d(2) -> Dropout(0.2)
conv2: Conv1D(32 -> 64, kernel_size=25, padding=12) -> BatchNorm1d -> ReLU -> MaxPool1d(2) -> Dropout(0.2)
conv3: Conv1D(64 -> 128, kernel_size=10, padding=5) -> BatchNorm1d -> ReLU -> MaxPool1d(2) -> Dropout(0.3)
conv4: Conv1D(128 -> 256, kernel_size=5, padding=2) -> BatchNorm1d -> ReLU -> AdaptiveAvgPool1d(1) -> Dropout(0.3)
fc:    Linear(256 -> 128) -> ReLU -> Dropout(0.3) -> Linear(128 -> 64) -> ReLU -> Dropout(0.3) -> Linear(64 -> 4)
```

### Preprocessing Pipeline:
1. **Mono Audio Load**: Decodes audio file bytes into a single-channel floating-point array.
2. **Original Duration Calculation**: Calculates the original recording duration in seconds before zero-padding.
3. **Resampling**: Resamples input audio signal to **2,000 Hz**.
4. **Peak Normalization**: Normalizes max absolute amplitude to $[-1.0, 1.0]$.
5. **Padding / Cropping**: Zero-pads or center-crops the signal array to exactly **60,000 samples** (30s at 2kHz).
6. **Batch Input Tensor**: Formats tensor to shape `(1, 1, 60000)` for PyTorch model evaluation (`model.eval()`, `torch.no_grad()`).

---

## 3. Class Output Mapping

* **Raw Output Classes**:
  * `0`: `Normal`
  * `1`: `Murmur`
  * `2`: `Extra Heart Sound`
  * `3`: `Artifact`

* **UI Contract Mapping**:
  * **Class 0 (`Normal`)**:
    * `label` = `"Normal"`
    * `status` = `"No Abnormalities Detected"`
    * `confidence` = $P(\text{Class 0}) \times 100\%$
  * **Classes 1, 2, 3 (`Murmur` / `Extra` / `Artifact`)**:
    * `label` = `"Abnormal"`
    * `status` = `"Abnormal Heart Sound Detected"`
    * `confidence` = $(P(\text{Class 1}) + P(\text{Class 2}) + P(\text{Class 3})) \times 100\%$

---

## 4. Local Execution Commands

### Step 1: Set Up Python Virtual Environment & Install Dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 2: Download Model Checkpoint
Download `heartbeat-anomaly-detector-model.pt` from Hugging Face into `backend/checkpoints/`:
```bash
mkdir -p checkpoints
curl -L -o checkpoints/heartbeat-anomaly-detector-model.pt "https://huggingface.co/ai-mitra/heartbeat-anomaly-detector/resolve/main/heartbeat-anomaly-detector-model.pt"
```

### Step 3: Run FastAPI Inference Server
```bash
./venv/bin/uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

---

## 5. Complete One-Line Backend Startup Command

```bash
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && ./venv/bin/uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

---

## 5. Next.js Frontend Connection

Set the following environment variable in `.env.local` at the root of the project:

```env
MODEL_API_ENDPOINT=http://127.0.0.1:8000/predict
```
