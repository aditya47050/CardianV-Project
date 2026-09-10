import io
import numpy as np
import librosa
import torch

def preprocess_audio(
    audio_bytes: bytes,
    target_sr: int = 2000,
    target_samples: int = 60000
):
    """
    Heartbeat Anomaly Detector (ai-mitra/heartbeat-anomaly-detector) Preprocessing:
    1. Load audio bytes as mono signal using librosa.
    2. Compute original audio duration in seconds.
    3. Resample audio waveform to 2000 Hz target sample rate.
    4. Peak normalize waveform by dividing by max absolute amplitude.
    5. Zero-pad or crop waveform array to exactly 60,000 samples (30s at 2kHz).
    6. Return input tensor of shape (1, 1, 60000) and original audio duration.
    """
    # 1. Load raw audio bytes
    y, sr = librosa.load(io.BytesIO(audio_bytes), sr=None, mono=True)
    if len(y) == 0:
        raise ValueError("Uploaded audio file is empty or unreadable.")

    # 2. Compute ORIGINAL audio duration in seconds
    original_duration_seconds = float(len(y) / sr)

    # 3. Resample to 2000 Hz
    if sr != target_sr:
        y_resampled = librosa.resample(y, orig_sr=sr, target_sr=target_sr)
    else:
        y_resampled = y

    # 4. Peak normalization [-1.0, 1.0]
    max_amp = np.max(np.abs(y_resampled))
    if max_amp > 0:
        y_normalized = y_resampled / max_amp
    else:
        y_normalized = y_resampled

    # 5. Zero-pad or crop to target_samples (60,000)
    current_samples = len(y_normalized)
    if current_samples < target_samples:
        pad_width = target_samples - current_samples
        y_padded = np.pad(y_normalized, (0, pad_width), mode="constant")
    else:
        y_padded = y_normalized[:target_samples]

    # 6. Convert to PyTorch Tensor shape (batch=1, channel=1, samples=60000)
    audio_tensor = torch.tensor(y_padded, dtype=torch.float32).unsqueeze(0).unsqueeze(0)
    return audio_tensor, round(original_duration_seconds, 1)
