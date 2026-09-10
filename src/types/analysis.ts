export interface AnalysisResponse {
  success: boolean;
  modelConfigured: boolean;
  label?: string;
  status?: string;
  confidence?: number;
  durationSeconds?: number;
  details?: string;
  error?: string;
}
