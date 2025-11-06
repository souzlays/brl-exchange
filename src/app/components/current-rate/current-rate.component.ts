import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentRateResponse } from '../../models/exchange-rate.modal';

@Component({
  selector: 'app-current-rate',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './current-rate.component.html',
  styleUrls: ['./current-rate.component.css'],
})
export class CurrentRateComponent {
  @Input() exchangeRate!: CurrentRateResponse;
  @Output() toggleHistory = new EventEmitter<string>();

  onToggle() {
    this.toggleHistory.emit(this.exchangeRate.fromSymbol);
  }
}
