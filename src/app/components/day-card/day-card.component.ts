import { Component, Input, OnInit } from '@angular/core';

import { DailyRate } from '../../models/exchange-rate.modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css'],
})
export class DayCardComponent implements OnInit {
  @Input() day!: DailyRate;
  // @Input() previousDay?: DailyRate;
  // closeDiff = 0;

  ngOnInit() {
    // if (this.previousDay) {
    //   this.closeDiff = calcCloseDiff(this.day, this.previousDay);
    // }
  }
}
