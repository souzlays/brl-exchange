import { Component, Input } from '@angular/core';
import { DailyRate } from '../../models/exchange-rate.modal';
import { CommonModule } from '@angular/common';
import { DayCardComponent } from '../day-card/day-card.component';


@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [
    CommonModule,
    DayCardComponent
  ],
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent {
  @Input() history: DailyRate[] = [];
}
