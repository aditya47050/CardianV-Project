import os
import torch
import torch.nn as nn

try:
    import requests
    import certifi
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False
    import urllib.request
    import ssl


class HeartbeatAnomalyDetector(nn.Module):
    """
    Official 4-Layer 1D CNN Architecture matching ai-mitra/heartbeat-anomaly-detector checkpoint:
    
    Attribute naming and layer shapes match exact state_dict keys and weights:
    - conv1: Conv1d(1->32, kernel_size=50, padding=25) + BatchNorm1d(32) + ReLU + MaxPool1d(2) + Dropout(0.2)
    - conv2: Conv1d(32->64, kernel_size=25, padding=12) + BatchNorm1d(64) + ReLU + MaxPool1d(2) + Dropout(0.2)
    - conv3: Conv1d(64->128, kernel_size=10, padding=5) + BatchNorm1d(128) + ReLU + MaxPool1d(2) + Dropout(0.3)
    - conv4: Conv1d(128->256, kernel_size=5, padding=2) + BatchNorm1d(256) + ReLU + AdaptiveAvgPool1d(1) + Dropout(0.3)
    - fc: Linear(256->128) -> ReLU -> Dropout(0.3) -> Linear(128->64) -> ReLU -> Dropout(0.3) -> Linear(64->4)
    """
    def __init__(self, num_classes: int = 4):
        super(HeartbeatAnomalyDetector, self).__init__()
        self.conv1 = nn.Sequential(
            nn.Conv1d(1, 32, kernel_size=50, padding=25),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.MaxPool1d(2),
            nn.Dropout(0.2)
        )
        self.conv2 = nn.Sequential(
            nn.Conv1d(32, 64, kernel_size=25, padding=12),
            nn.BatchNorm1d(64),
            nn.ReLU(),
            nn.MaxPool1d(2),
            nn.Dropout(0.2)
        )
        self.conv3 = nn.Sequential(
            nn.Conv1d(64, 128, kernel_size=10, padding=5),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.MaxPool1d(2),
            nn.Dropout(0.3)
        )
        self.conv4 = nn.Sequential(
            nn.Conv1d(128, 256, kernel_size=5, padding=2),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.AdaptiveAvgPool1d(1),
            nn.Dropout(0.3)
        )
        self.fc = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, num_classes)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.conv3(x)
        x = self.conv4(x)
        x = torch.flatten(x, 1)
        logits = self.fc(x)
        return logits


class HeartbeatModelInference:
    """
    Pretrained Model Inference Loader for heartbeat-anomaly-detector-model.pt
    Automatically downloads model weights over HTTPS from Hugging Face to writable /tmp on serverless environments.
    """
    MODEL_URL = "https://huggingface.co/ai-mitra/heartbeat-anomaly-detector/resolve/main/heartbeat-anomaly-detector-model.pt"

    def __init__(self, checkpoint_path: str = None):
        if checkpoint_path is None:
            # Use /tmp on Vercel/Serverless environments to prevent EROFS (Read-only filesystem)
            if os.getenv("VERCEL") or not os.access(os.path.dirname(__file__), os.W_OK):
                checkpoint_dir = "/tmp/checkpoints"
            else:
                checkpoint_dir = os.path.join(os.path.dirname(__file__), "checkpoints")

            os.makedirs(checkpoint_dir, exist_ok=True)
            checkpoint_path = os.getenv(
                "MODEL_CHECKPOINT_PATH",
                os.path.join(checkpoint_dir, "heartbeat-anomaly-detector-model.pt")
            )

        self.checkpoint_path = checkpoint_path
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = None
        self.is_loaded = False

        self._ensure_and_load_checkpoint()

    def _download_checkpoint(self):
        temp_path = self.checkpoint_path + ".tmp"
        print(f"Downloading pretrained checkpoint from Hugging Face: {self.MODEL_URL}...")
        
        try:
            if HAS_REQUESTS:
                ca_bundle = certifi.where()
                with requests.get(self.MODEL_URL, stream=True, timeout=120, verify=ca_bundle) as response:
                    response.raise_for_status()
                    with open(temp_path, "wb") as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            if chunk:
                                f.write(chunk)
            else:
                context = ssl.create_default_context(cafile=certifi.where())
                with urllib.request.urlopen(self.MODEL_URL, context=context, timeout=120) as response, open(temp_path, "wb") as f:
                    f.write(response.read())

            os.replace(temp_path, self.checkpoint_path)
            print(f"Checkpoint successfully saved to {self.checkpoint_path}")

        except Exception as e:
            if os.path.exists(temp_path):
                try:
                    os.remove(temp_path)
                except OSError:
                    pass
            raise RuntimeError(
                f"Failed to download pretrained checkpoint from '{self.MODEL_URL}': {str(e)}"
            ) from e

    def _ensure_and_load_checkpoint(self):
        # Auto-download from Hugging Face if checkpoint file does not exist locally
        if not os.path.exists(self.checkpoint_path):
            self._download_checkpoint()

        try:
            self.model = HeartbeatAnomalyDetector(num_classes=4).to(self.device)
            checkpoint = torch.load(self.checkpoint_path, map_location=self.device)

            if isinstance(checkpoint, dict):
                state_dict = checkpoint.get("state_dict", checkpoint.get("model_state_dict", checkpoint))
            else:
                state_dict = checkpoint.state_dict() if hasattr(checkpoint, "state_dict") else checkpoint

            # Load weights strictly to verify state_dict key alignment
            self.model.load_state_dict(state_dict, strict=True)

            self.model.eval()
            self.is_loaded = True
        except Exception as e:
            self.is_loaded = False
            raise RuntimeError(
                f"Failed to load checkpoint '{self.checkpoint_path}': {str(e)}"
            ) from e

    def predict(self, audio_tensor: torch.Tensor):
        if not self.is_loaded or self.model is None:
            raise RuntimeError(
                f"Pretrained model weights missing or failed to load. Checkpoint path: {self.checkpoint_path}"
            )

        audio_tensor = audio_tensor.to(self.device)
        with torch.no_grad():
            logits = self.model(audio_tensor)
            probs = torch.softmax(logits, dim=1).squeeze(0)

        # Raw class probabilities for 4 output categories
        p_normal = float(probs[0].item())
        p_murmur = float(probs[1].item())
        p_extra = float(probs[2].item())
        p_artifact = float(probs[3].item())

        predicted_index = int(torch.argmax(probs).item())
        class_names = ["Normal", "Murmur", "Extra Heart Sound", "Artifact"]
        predicted_class_name = class_names[predicted_index]

        p_abnormal_total = p_murmur + p_extra + p_artifact

        return {
            "p_normal": p_normal,
            "p_abnormal_total": p_abnormal_total,
            "p_murmur": p_murmur,
            "p_extra": p_extra,
            "p_artifact": p_artifact,
            "predicted_index": predicted_index,
            "predicted_class_name": predicted_class_name,
            "probabilities": [p_normal, p_murmur, p_extra, p_artifact]
        }
