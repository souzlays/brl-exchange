import { Component } from '@angular/core';
import { ExchangeService } from './services/exchange.service';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CurrentRateComponent } from './components/current-rate/current-rate.component';
import { HistoryListComponent } from './components/history-list/history-list.component';
import { CurrentRateResponse, DailyRate } from './models/exchange-rate.modal';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SearchFormComponent,
    CurrentRateComponent,
    HistoryListComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentRate?: CurrentRateResponse;
  history: DailyRate[] = [];
  showHistory = false;

  constructor(private exchangeService: ExchangeService) {}

  onSearch(currencyCode: string) {
    this.exchangeService.getCurrentRate(currencyCode, 'BRL').subscribe({
      next: (data) => {
        console.log('Resposta da API (getCurrentRate):', data);
        this.currentRate = data;
      },
      error: (err) => {
        console.error('Erro na requisição getCurrentRate:', err);
      }
    })
  }

  onToggleHistory(currencyCode: string) {
    this.showHistory = !this.showHistory;

    if (this.showHistory && currencyCode) {
      this.exchangeService.getDailyRates(currencyCode, 'BRL').subscribe({
        next: (data) => {
          console.log('Histórico diário (original):', data);
      
          const hoje = new Date();
          const trintaDiasAtras = new Date();
          trintaDiasAtras.setDate(hoje.getDate() - 30);
      
          
          this.history = data.filter((item: DailyRate) => {
            const dataItem = new Date(item.date);
            return dataItem >= trintaDiasAtras && dataItem <= hoje;
          });
      
        
          this.history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
          console.log('Histórico filtrado (últimos 30 dias):', this.history);
        },
        error: (err) => {
          console.error('Erro na requisição getDailyRates:', err);
        }
      });
      
    }
  }
}
