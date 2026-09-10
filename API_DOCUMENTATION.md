# Heart Sound API Integration

## 1. Why did we use an API?

The website itself is not responsible for doing the heavy heart-sound analysis.

We send the uploaded audio to a backend API.
The backend sends the audio to the pretrained AI model.
The model checks the heart sound and sends the result back.
The website then shows that result to the user.

### Simple Flow

```
Audio
  ↓
Website
  ↓
Next.js API
  ↓
FastAPI
  ↓
AI Model
  ↓
Result
  ↓
Website
```

---

## 2. What did we implement?

We built a real connection between the website and the AI model:

- **Audio File Upload**: Allows the user to pick or upload a heart-sound sound file.
- **Next.js API Route (`/api/analyze`)**: Receives the audio file on the website server.
- **FastAPI Endpoint (`/predict`)**: Dedicated Python server for running the AI model.
- **Pretrained Heart-Sound Model**: Uses trained weights to classify the audio.
- **Real Model Inference**: Calculates actual predictions for every uploaded recording.
- **Live Result Display**: Shows the true AI response directly on the screen.

**Note**: All results shown on the website are real and calculated by the AI model. Nothing is hardcoded or fake.

---

## 3. How does it work?

1. User selects an audio file.
2. Website keeps the actual audio file.
3. Website sends the file to `/api/analyze`.
4. Next.js forwards the audio to FastAPI.
5. FastAPI prepares the audio for the model.
6. The pretrained AI model analyzes the audio.
7. The model returns its prediction and confidence.
8. FastAPI sends the result back.
9. Website displays the result.

---

## 4. What does the API return?

Here is an example of the message returned by the API:

```json
{
  "label": "Normal",
  "status": "No Abnormalities Detected",
  "confidence": 99.9
}
```

- **`label`**: Tells us whether the sound is considered Normal or Abnormal.
- **`status`**: Gives a user-friendly sentence describing the result.
- **`confidence`**: Shows how sure the AI model is about its decision, as a percentage.

---

## 5. Why use Next.js API + FastAPI?

Next.js handles the website.
FastAPI handles the AI/model work.

Keeping them separate makes the project easier to manage and allows the AI backend to be changed later without rebuilding the whole frontend.

---

## 6. Model

- **Model Used**: `ai-mitra/heartbeat-anomaly-detector`

It is a pretrained model, so we did not train a model from scratch.

The model can return 4 possible categories:
- Normal
- Murmur
- Extra Heart Sound
- Artifact

---

## 7. Testing

Here are real test results from running audio files through the API:

- **Normal Sample**:
  - Result: **Normal, 99.9%**
- **`13918_AV.wav`**:
  - Result: **Abnormal Heart Sound Detected, 74.0%**
  - Model class: **Murmur**

*(Note: These are individual test results for demo recordings, not an overall measure of total model accuracy).*

---

## 8. One-line summary

"We connected the website to a real AI model through an API, so uploaded heart-sound audio is actually analyzed and the real model result is shown on the website."
