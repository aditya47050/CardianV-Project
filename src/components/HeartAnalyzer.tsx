"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  FileAudio,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  User,
  Calendar,
  Sparkles,
  ChevronLeft,
  MoreVertical,
  Play,
  Pause,
} from "lucide-react";
import { AnalysisResponse } from "@/types/analysis";

type Step = "input" | "analyzing" | "result";

export function HeartAnalyzer() {
  const [step, setStep] = useState<Step>("input");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [audioFile, setAudioFile] = useState<{
    name: string;
    size: string;
    isSample?: boolean;
    rawFile?: File | Blob;
  } | null>(null);

  // Analysis result state from real API route
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // Analysis progress animation states
  const [progress, setProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState(
    "Initializing Circadian Acoustic Engine..."
  );

  // Audio preview simulation state
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle demo sample selection
  const handleSelectDemo = () => {
    const demoBlob = new Blob(["circadian_demo_pcg_sample"], { type: "audio/wav" });
    const demoFile = new File([demoBlob], "circadian_heart_sound_normal_s1s2.wav", {
      type: "audio/wav",
    });
    setAudioFile({
      name: "circadian_heart_sound_normal_s1s2.wav",
      size: "2.4 MB",
      isSample: true,
      rawFile: demoFile,
    });
    if (!patientName) {
      setPatientName("Sarah Jenkins");
    }
  };

  // Handle actual file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setAudioFile({
        name: file.name,
        size: `${sizeMB} MB`,
        isSample: false,
        rawFile: file,
      });
    }
  };

  // Start analysis trigger & API call
  const handleStartAnalysis = async () => {
    if (!audioFile || !patientName.trim()) return;
    setStep("analyzing");
    setProgress(0);
    setAnalysisResult(null);
    setIsLoading(true);

    // Prepare FormData payload containing the audio File/Blob
    const formData = new FormData();
    if (audioFile.rawFile) {
      formData.append("file", audioFile.rawFile, audioFile.name);
    }
    formData.append("patientName", patientName);
    if (patientAge) formData.append("patientAge", patientAge);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data: AnalysisResponse = await res.json();
      setAnalysisResult(data);
    } catch (err: unknown) {
      setAnalysisResult({
        success: false,
        modelConfigured: false,
        status: "Network Error",
        error: err instanceof Error ? err.message : "Failed to connect to API endpoint.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI Analysis loading sequence synchronized with API response
  useEffect(() => {
    if (step !== "analyzing") return;

    const phases = [
      "Loading acoustic telemetry data...",
      "Isolating S1 and S2 heart sound waveforms...",
      "Filtering ambient noise & acoustic reflections...",
      "Running neural acoustic classifier...",
      "Evaluating murmur frequency components...",
      "Finalizing cardiac health diagnostic report...",
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress >= 95 && isLoadingRef.current) {
        setAnalysisPhase("Finalizing cardiac health diagnostic report...");
        return;
      }

      currentProgress += 4;
      setProgress(Math.min(currentProgress, 100));

      const phaseIndex = Math.min(
        Math.floor((currentProgress / 100) * phases.length),
        phases.length - 1
      );
      setAnalysisPhase(phases[phaseIndex]);

      if (currentProgress >= 100 && !isLoadingRef.current) {
        clearInterval(interval);
        setTimeout(() => {
          setStep("result");
        }, 300);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [step, isLoading]);

  // Reset flow back to input screen
  const handleReset = () => {
    setStep("input");
    setProgress(0);
    setAudioFile(null);
    setAnalysisResult(null);
    setIsLoading(false);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* ========================================================================= */}
      {/* STEP 1: INPUT FORM SCREEN                                                 */}
      {/* ========================================================================= */}
      {step === "input" && (
        <div className="bg-white/95 backdrop-blur-md rounded-[32px] border border-white shadow-[0_20px_60px_rgba(16,163,127,0.1)] p-6 sm:p-10 md:p-12 transition-all duration-300">
          {/* Header Badge & Title */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-[#cbf1fa] via-[#a3e5f5] to-[#a3e2f3] px-4 py-1.5 text-xs font-semibold text-[#126d83] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#10a37f]" />
              <span>AI Acoustic Diagnostic Engine</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium italic text-[#10a37f] tracking-tight">
              Start Heart Analysis
            </h1>
            <p className="font-serif text-slate-600 max-w-lg font-light text-base sm:text-lg">
              Upload a heart sound recording or use our demo acoustic sample for instant AI cardiac analysis.
            </p>
          </div>

          {/* Form Content */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Patient Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Patient Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#10a37f] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Patient Age <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="e.g. 42"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#10a37f] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Audio Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Heart Sound Recording <span className="text-rose-500">*</span>
              </label>

              {!audioFile ? (
                <div className="relative border-2 border-dashed border-slate-200 hover:border-[#10a37f] rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-[#f0fbf8] transition-all duration-200 group">
                  <input
                    type="file"
                    accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-[#e6f7f3] text-[#10a37f] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Click to Upload or Drag Audio File
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports MP3, WAV, M4A, OGG up to 25MB
                      </p>
                    </div>
                  </div>

                  {/* Instant Demo Button */}
                  <div className="mt-5 pt-5 border-t border-slate-200/80 flex justify-center relative z-20">
                    <button
                      type="button"
                      onClick={handleSelectDemo}
                      className="inline-flex items-center text-xs font-semibold text-[#10a37f] hover:text-[#0c7a5f] bg-[#e6f7f3] hover:bg-[#d0f2ea] px-4 py-2 rounded-full transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      Use Demo Heart Sound Sample (.wav)
                    </button>
                  </div>
                </div>
              ) : (
                /* Selected File Card: Fully contained & responsive at all viewport widths */
                <div className="w-full max-w-full box-border p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f0fbf8] to-[#e4f6fc] border border-[#b2f0e0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                  {/* Left Info Area: Icon + Text Container */}
                  <div className="flex items-start space-x-3.5 w-full min-w-0 flex-1">
                    {/* Fixed Size Audio Icon */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#10a37f] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 sm:mt-0">
                      <FileAudio className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                    </div>

                    {/* Filename & Metadata: Takes remaining width & wraps naturally */}
                    <div className="min-w-0 flex-1 w-full">
                      <p className="text-sm font-bold text-slate-900 break-words [overflow-wrap:anywhere] whitespace-normal leading-snug">
                        {audioFile.name}
                      </p>
                      <p className="text-xs text-[#10a37f] font-medium flex flex-wrap items-center mt-1 gap-x-1.5 gap-y-0.5 leading-normal min-w-0">
                        <span className="inline-flex items-center shrink-0 text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" />
                          {audioFile.size}
                        </span>
                        <span className="text-slate-400 font-light shrink-0">•</span>
                        <span className="break-words [overflow-wrap:anywhere]">
                          {audioFile.isSample ? "Circadian Demo Recording" : "Uploaded File Ready"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Actions Area: Preview & Change Buttons */}
                  <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t border-slate-200/50 sm:border-t-0">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1.5 rounded-lg bg-white text-[#10a37f] hover:bg-[#e6f7f3] transition-colors border border-[#b2f0e0] text-xs font-semibold inline-flex items-center shadow-xs shrink-0"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 mr-1.5 text-slate-700 shrink-0" />
                          <span className="text-slate-700">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 mr-1.5 text-[#10a37f] shrink-0" />
                          <span>Preview</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAudioFile(null)}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium px-2.5 py-1.5 hover:underline shrink-0"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Validation Warning */}
            {(!audioFile || !patientName.trim()) && (
              <p className="text-xs text-slate-500 italic flex items-center justify-center">
                <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                Please enter a Patient Name and select an audio recording to proceed.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleStartAnalysis}
              disabled={!audioFile || !patientName.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-base shadow-md transition-all duration-300 flex items-center justify-center space-x-2 ${
                audioFile && patientName.trim()
                  ? "bg-[#10a37f] hover:bg-[#0c7a5f] text-white shadow-[0_4px_14px_rgba(16,163,127,0.3)] cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <span>Analyze Heart Sound</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: ANALYZING LOADING SCREEN                                          */}
      {/* ========================================================================= */}
      {step === "analyzing" && (
        <div className="bg-white/95 backdrop-blur-md rounded-[32px] border border-white shadow-[0_20px_60px_rgba(16,163,127,0.12)] p-8 sm:p-14 max-w-xl mx-auto text-center flex flex-col items-center space-y-8">
          {/* Animated Circular Gauge */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#e6f7f3"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#10a37f"
                strokeWidth="6"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * progress) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-150 ease-out"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#e6f7f3] text-[#10a37f] flex items-center justify-center mb-1 animate-pulse">
                <FileAudio className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-slate-900 font-sans">
                {progress}%
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-sm">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium italic text-[#10a37f]">
              Analyzing Heart Sounds
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium min-h-[2em] flex items-center justify-center">
              {analysisPhase}
            </p>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden max-w-md">
            <div
              className="bg-gradient-to-r from-[#10a37f] to-[#0c7a5f] h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: RESULT SCREEN (FULL MOBILE VIEW ON MOBILE, LANDSCAPE WEB ON DESKTOP) */}
      {/* ========================================================================= */}
      {step === "result" && (
        <>
          {/* --------------------------------------------------------------------- */}
          {/* MOBILE FULL SCREEN VIEW (Only visible on mobile view < sm)             */}
          {/* --------------------------------------------------------------------- */}
          <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto sm:hidden animate-fadeIn">
            {/* Mobile Top Navigation Header: [< Back Arrow] [CircadianV Logo] [: 3-Dots Menu] */}
            <div className="sticky top-0 z-10 bg-white px-4 py-3.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
              <button
                type="button"
                onClick={handleReset}
                className="p-2 text-[#10a37f] hover:bg-[#e6f7f3] rounded-full transition-colors"
                aria-label="Go Back"
              >
                <ChevronLeft className="w-6 h-6 text-[#10a37f]" />
              </button>

              {/* Centered Logo */}
              <div className="flex items-center space-x-2">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-[#10a37f]"
                >
                  <path
                    d="M50 85 C26 68 12 51 12 34 C12 21 22 11 35 11 C42 11 47 14 50 18 C53 14 58 11 65 11 C78 11 88 21 88 34 C88 51 74 68 50 85 Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 38 H38 L43 28 L50 48 L57 20 L64 50 L70 38 H86"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-bold tracking-tight text-slate-800 font-sans">
                  Circadian<span className="text-[#10a37f]">V</span>
                </span>
              </div>

              {/* 3-Dots Menu Button */}
              <button
                type="button"
                className="p-2 text-[#10a37f] hover:bg-[#e6f7f3] rounded-full transition-colors"
                aria-label="Options Menu"
              >
                <MoreVertical className="w-5 h-5 text-[#10a37f]" />
              </button>
            </div>

            {/* Mobile Result Body Content */}
            <div className="flex-1 px-6 py-6 flex flex-col items-center justify-between text-center space-y-6">
              {/* API Error Alert Notice */}
              {analysisResult && !analysisResult.success && analysisResult.error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 px-3.5 py-2.5 rounded-xl text-xs font-medium text-center w-full max-w-xs flex items-center justify-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{analysisResult.error}</span>
                </div>
              )}

              {/* Model Pending Connection Notice */}
              {analysisResult && analysisResult.success && !analysisResult.modelConfigured && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 px-3.5 py-2.5 rounded-xl text-xs font-medium text-center w-full max-w-xs flex items-center justify-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Model backend pending connection (`MODEL_API_ENDPOINT`)</span>
                </div>
              )}

              {/* Analysis Title & Time */}
              <div className="space-y-1 mt-2">
                <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
                  {isLoading
                    ? "Analyzing Heart Sound..."
                    : analysisResult?.success === false
                    ? "Analysis Error"
                    : "Analysis Complete"}
                </h2>
                <p className="text-base text-slate-500 font-medium">
                  {isLoading
                    ? "Processing acoustic signal..."
                    : analysisResult?.success === false
                    ? "Unable to complete request"
                    : analysisResult?.durationSeconds !== undefined
                    ? `${analysisResult.durationSeconds} seconds`
                    : "--"}
                </p>
              </div>

              {/* 6-Segment Circular Ring Visualization around Heart */}
              <div className="relative w-64 h-64 flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-sm"
                >
                  {/* Segment 1: Bottom-Left Arc (Light Teal) */}
                  <path
                    d="M 55.8 216.0 A 115 115 0 0 1 35.0 149.2"
                    stroke="#cbf1fa"
                    strokeWidth="11"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                  {/* Segment 2: Lower-Mid Left Arc (Teal) */}
                  <path
                    d="M 36.1 134.1 A 115 115 0 0 1 66.3 71.1"
                    stroke="#10a37f"
                    strokeWidth="11"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out delay-75"
                  />
                  {/* Segment 3: Upper-Left Arc (Teal) */}
                  <path
                    d="M 77.4 60.8 A 115 115 0 0 1 142.5 35.2"
                    stroke="#10a37f"
                    strokeWidth="11"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out delay-150"
                  />
                  {/* Segment 4: Upper-Right Arc (Teal) */}
                  <path
                    d="M 157.5 35.2 A 115 115 0 0 1 222.6 60.8"
                    stroke="#10a37f"
                    strokeWidth="11"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out delay-225"
                  />
                  {/* Segment 5: Lower-Mid Right Arc (Teal) */}
                  <path
                    d="M 233.7 71.1 A 115 115 0 0 1 263.9 134.1"
                    stroke="#10a37f"
                    strokeWidth="11"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out delay-300"
                  />
                  {/* Segment 6: Bottom-Right Arc (Teal) */}
                  <path
                    d="M 265.0 149.2 A 115 115 0 0 1 244.2 216.0"
                    stroke="#10a37f"
                    strokeWidth="11"
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out delay-375"
                  />
                  {/* Center Solid Teal Heart */}
                  <path
                    d="M 150 215 C 105 185 72 155 72 122 C 72 96 92 78 118 78 C 133 78 145 85 150 94 C 155 85 167 78 182 78 C 208 78 228 96 228 122 C 228 155 195 185 150 215 Z"
                    fill="#10a37f"
                    className="animate-pulse"
                  />
                  {/* White ECG Pulse Waveform inside Heart */}
                  <path
                    d="M 94 135 H 122 L 132 118 L 142 155 L 152 102 L 164 162 L 174 135 H 206"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Status Header */}
              <div>
                <h3
                  className={`text-2xl font-bold leading-snug font-sans tracking-tight max-w-xs mx-auto ${
                    isLoading
                      ? "text-slate-600 animate-pulse"
                      : analysisResult?.success === false
                      ? "text-rose-600"
                      : analysisResult?.status?.toLowerCase().includes("abnormal")
                      ? "text-rose-600"
                      : "text-[#10a37f]"
                  }`}
                >
                  {isLoading
                    ? "Analyzing heart sound..."
                    : analysisResult?.success === false
                    ? analysisResult?.status || analysisResult?.error || "Analysis Error"
                    : analysisResult?.status || analysisResult?.label || "No Abnormalities Detected"}
                </h3>
              </div>

              {/* Teal Accent Divider */}
              <div className="w-10 h-1 bg-[#10a37f] rounded-full my-1" />

              {/* AI Confidence Score */}
              <div className="space-y-1">
                <p className="text-xs text-slate-500 font-medium tracking-wide">
                  AI Analysis Confidence
                </p>
                <p className="text-5xl font-bold text-slate-900 font-sans tracking-tight leading-none">
                  {isLoading ? (
                    <span className="text-3xl text-slate-400 font-medium animate-pulse">Processing...</span>
                  ) : analysisResult?.success === false ? (
                    <span className="text-3xl text-rose-500 font-medium">--</span>
                  ) : analysisResult?.confidence !== undefined ? (
                    `${analysisResult.confidence.toFixed(1)}%`
                  ) : (
                    "--"
                  )}
                </p>
              </div>

              {/* Footer CTA & Patient Info */}
              <div className="w-full max-w-xs pt-4 space-y-3 pb-6">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 text-center">
                  <span className="font-semibold text-slate-800">
                    Patient: {patientName} {patientAge ? `(${patientAge} yrs)` : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-[#10a37f] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0c7a5f] transition-all"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Analyze Another Recording</span>
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* DESKTOP WEB VIEW (Hidden on mobile < sm, visible on desktop sm+)      */}
          {/* --------------------------------------------------------------------- */}
          <div className="hidden sm:block w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-[32px] border border-white shadow-[0_20px_60px_rgba(16,163,127,0.12)] p-6 sm:p-10 md:p-12 transition-all duration-300 animate-fadeIn">
            {/* Header Bar: Clean CircadianV Logo Header */}
            <div className="flex items-center justify-between w-full pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#10a37f]"
                >
                  <path
                    d="M50 85 C26 68 12 51 12 34 C12 21 22 11 35 11 C42 11 47 14 50 18 C53 14 58 11 65 11 C78 11 88 21 88 34 C88 51 74 68 50 85 Z"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24 38 H38 L43 28 L50 48 L57 20 L64 50 L70 38 H86"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-2xl font-bold tracking-tight text-slate-800 font-sans">
                  Circadian<span className="text-[#10a37f]">V</span>
                </span>
              </div>

              {isLoading ? (
                <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/60 inline-block animate-pulse">
                  ⏳ Analyzing Heart Sound...
                </span>
              ) : analysisResult?.success === false ? (
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60 inline-block">
                  ✕ Analysis Failed
                </span>
              ) : (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 inline-block">
                  ✓ Analysis Engine Ready
                </span>
              )}
            </div>

            {/* API Error Alert Notice */}
            {analysisResult && !analysisResult.success && analysisResult.error && (
              <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-800 p-3.5 rounded-xl text-xs font-medium flex items-center space-x-2 w-full">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{analysisResult.error}</span>
              </div>
            )}

            {/* Model Pending Connection Notice */}
            {analysisResult && analysisResult.success && !analysisResult.modelConfigured && (
              <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 p-3.5 rounded-xl text-xs font-medium flex items-center space-x-2 w-full">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Pretrained model backend not connected. Set the <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono">MODEL_API_ENDPOINT</code> environment variable to enable real ML inference.
                </span>
              </div>
            )}

            {/* LANDSCAPE LAYOUT FOR WEB / DESKTOP (Side-by-Side 2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center pt-6">
              {/* Left Column: Large Segmented Heart Visual */}
              <div className="md:col-span-5 flex justify-center items-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
                  <svg
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-sm"
                  >
                    {/* Segment 1: Bottom-Left Arc (Light Teal) */}
                    <path
                      d="M 55.8 216.0 A 115 115 0 0 1 35.0 149.2"
                      stroke="#cbf1fa"
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                    {/* Segment 2: Lower-Mid Left Arc (Teal) */}
                    <path
                      d="M 36.1 134.1 A 115 115 0 0 1 66.3 71.1"
                      stroke="#10a37f"
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out delay-75"
                    />
                    {/* Segment 3: Upper-Left Arc (Teal) */}
                    <path
                      d="M 77.4 60.8 A 115 115 0 0 1 142.5 35.2"
                      stroke="#10a37f"
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out delay-150"
                    />
                    {/* Segment 4: Upper-Right Arc (Teal) */}
                    <path
                      d="M 157.5 35.2 A 115 115 0 0 1 222.6 60.8"
                      stroke="#10a37f"
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out delay-225"
                    />
                    {/* Segment 5: Lower-Mid Right Arc (Teal) */}
                    <path
                      d="M 233.7 71.1 A 115 115 0 0 1 263.9 134.1"
                      stroke="#10a37f"
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out delay-300"
                    />
                    {/* Segment 6: Bottom-Right Arc (Teal) */}
                    <path
                      d="M 265.0 149.2 A 115 115 0 0 1 244.2 216.0"
                      stroke="#10a37f"
                      strokeWidth="11"
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out delay-375"
                    />
                    {/* Center Solid Teal Heart */}
                    <path
                      d="M 150 215 C 105 185 72 155 72 122 C 72 96 92 78 118 78 C 133 78 145 85 150 94 C 155 85 167 78 182 78 C 208 78 228 96 228 122 C 228 155 195 185 150 215 Z"
                      fill="#10a37f"
                      className="animate-pulse"
                    />
                    {/* White ECG Pulse Waveform inside Heart */}
                    <path
                      d="M 94 135 H 122 L 132 118 L 142 155 L 152 102 L 164 162 L 174 135 H 206"
                      stroke="white"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Right Column: Diagnostic Results & Metrics */}
              <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 font-sans tracking-tight">
                    {isLoading
                      ? "Analyzing Heart Sound..."
                      : analysisResult?.success === false
                      ? "Analysis Error"
                      : "Analysis Complete"}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-500 font-medium mt-0.5">
                    {isLoading
                      ? "Processing acoustic signal..."
                      : analysisResult?.success === false
                      ? "Unable to complete request"
                      : analysisResult?.durationSeconds !== undefined
                      ? `${analysisResult.durationSeconds} seconds`
                      : "--"}
                  </p>
                </div>

                <div>
                  <h3
                    className={`text-2xl sm:text-3xl font-bold leading-snug font-sans tracking-tight ${
                      isLoading
                        ? "text-slate-600 animate-pulse"
                        : analysisResult?.success === false
                        ? "text-rose-600"
                        : analysisResult?.status?.toLowerCase().includes("abnormal")
                        ? "text-rose-600"
                        : "text-[#10a37f]"
                    }`}
                  >
                    {isLoading
                      ? "Analyzing heart sound..."
                      : analysisResult?.success === false
                      ? analysisResult?.status || analysisResult?.error || "Analysis Error"
                      : analysisResult?.status || analysisResult?.label || "No Abnormalities Detected"}
                  </h3>
                </div>

                {/* Teal Short Divider */}
                <div className="w-10 h-1 bg-[#10a37f] rounded-full my-1" />

                {/* AI Confidence Meter with tight vertical gaps */}
                <div className="space-y-0.5 pt-0.5">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide">
                    AI Analysis Confidence
                  </p>
                  <p className="text-4xl sm:text-5xl font-bold text-slate-900 font-sans tracking-tight leading-none">
                    {isLoading ? (
                      <span className="text-2xl sm:text-3xl text-slate-400 font-medium animate-pulse">Processing...</span>
                    ) : analysisResult?.success === false ? (
                      <span className="text-2xl sm:text-3xl text-rose-500 font-medium">--</span>
                    ) : analysisResult?.confidence !== undefined ? (
                      `${analysisResult.confidence.toFixed(1)}%`
                    ) : (
                      "--"
                    )}
                  </p>
                </div>

                {/* Patient Metadata Bar */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 w-full flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Patient: {patientName} {patientAge ? `(${patientAge} yrs)` : ""}
                  </span>
                  <span className={analysisResult?.success === false ? "text-rose-600 font-medium" : "text-emerald-600 font-medium"}>
                    {isLoading
                      ? "Processing Signal..."
                      : analysisResult?.success === false
                      ? "Signal Error"
                      : "Verified Acoustic Signal"}
                  </span>
                </div>

                {/* Primary CTA Action */}
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto button-hover inline-flex items-center justify-center rounded-xl bg-[#10a37f] px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0c7a5f] transition-all"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Analyze Another Recording</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

