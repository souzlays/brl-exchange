import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentRateResponse, DailyRate, DailyRateResponse } from '../models/exchange-rate.modal';
import { map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ExchangeService {
  private readonly API_KEY: string;
  private readonly BASE_URL: string;


  constructor(
    private http: HttpClient,
    @Inject ('ENVIRONMENT') private env: any 
  ) {
    this.API_KEY = env.apiKey;
    this.BASE_URL = env.baseUrl;
  }


  getCurrentRate(fromSymbol: string, toSymbol: string): Observable<CurrentRateResponse> {
    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('from_symbol', fromSymbol)
      .set('to_symbol', toSymbol);
    
    return this.http.get<CurrentRateResponse>(
      `${this.BASE_URL}/open/currentExchangeRate`,
      { params }
    );
  }

  getDailyRates(fromSymbol: string, toSymbol: string): Observable<DailyRate[]> {
    const params = new HttpParams()
      .set('apiKey', this.API_KEY)
      .set('from_symbol', fromSymbol)
      .set('to_symbol', toSymbol);

    return this.http.get<DailyRateResponse>(
      `${this.BASE_URL}/open/dailyExchangeRate`,
      { params }
    ).pipe(
      map((response: DailyRateResponse) => {
        const rates = response.data ?? [];

        const sortedAsc = [...rates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const  withDiff = sortedAsc.map((rate, idx) => {
          if (idx === 0) return { ...rate, closeDiff: 0 };
          const previousClose = sortedAsc[idx - 1].close;
          const diffPercent = previousClose ? ((rate.close - previousClose) / previousClose) * 100 : 0;
          return { ...rate, closeDiff: diffPercent}
        });
        return withDiff.reverse();
      })
    );
  }

  private calculateCloseDiff(rates: DailyRate[]): DailyRate[] {
    return rates.map((rate, index) => {
      if (index === 0) {
        return { ...rate, closeDiff: 0 };
      }
      
      const previousClose = rates[index - 1].close;
      const closeDiff = rate.close - previousClose;
      
      return { ...rate, closeDiff };
    });
  }
}
