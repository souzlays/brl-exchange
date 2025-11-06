// Resposta da API para taxa atual
export interface CurrentRateResponse {
  success: boolean;
  lastUpdatedAt: string;
  fromSymbol: string;
  toSymbol: string;
  exchangeRate: number;
}

// Resposta da API para taxas diárias
export interface DailyRateResponse {
  success: boolean;
  lastUpdatedAt: string;
  fromSymbol: string;
  toSymbol: string;
  data: DailyRate[];
}

export interface DailyRate {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  closeDiff?: number; // Diferença calculada entre dias
}