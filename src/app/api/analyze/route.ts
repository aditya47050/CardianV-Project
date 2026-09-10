import { NextRequest, NextResponse } from "next/server";
import { AnalysisResponse } from "@/types/analysis";

export async function POST(
  req: NextRequest
): Promise<NextResponse<AnalysisResponse>> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const patientName = formData.get("patientName") as string | null;
    const patientAge = formData.get("patientAge") as string | null;

    // Validate audio file existence
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          modelConfigured: false,
          error: "No audio recording file provided in the request payload.",
        },
        { status: 400 }
      );
    }

    // Check environment variable for pretrained ML inference endpoint
    const modelEndpoint =
      process.env.MODEL_API_ENDPOINT || process.env.NEXT_PUBLIC_MODEL_API_ENDPOINT;

    // If pretrained model API is connected via environment variable, forward payload:
    if (modelEndpoint) {
      const modelFormData = new FormData();
      modelFormData.append("file", file, file.name);
      if (patientName) modelFormData.append("patientName", patientName);
      if (patientAge) modelFormData.append("patientAge", patientAge);

      const startTime = Date.now();
      const modelRes = await fetch(modelEndpoint, {
        method: "POST",
        body: modelFormData,
      });

      const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(1);

      if (!modelRes.ok) {
        const errorText = await modelRes.text();
        return NextResponse.json(
          {
            success: false,
            modelConfigured: true,
            error: `Model service error (${modelRes.status}): ${errorText}`,
          },
          { status: 502 }
        );
      }

      const modelData = await modelRes.json();
      return NextResponse.json({
        success: true,
        modelConfigured: true,
        label: modelData.label,
        status: modelData.status || modelData.label,
        confidence: modelData.confidence,
        durationSeconds: modelData.durationSeconds ?? parseFloat(elapsedTime),
        details: modelData.details,
      });
    }

    // If pretrained model backend is not yet connected/configured:
    return NextResponse.json({
      success: false,
      modelConfigured: false,
      status: "Model backend pending connection",
      error:
        "Pretrained heart-sound model endpoint is not configured. Set the MODEL_API_ENDPOINT environment variable to connect your inference server.",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected server error occurred.";
    return NextResponse.json(
      {
        success: false,
        modelConfigured: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
