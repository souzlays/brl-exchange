import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  currencyCode = '';
  showError = false;
  @Output() search = new EventEmitter<string>();

  onSubmit() {
    const code = this.currencyCode.trim().toUpperCase();

    const isValid = /^[A-Z]{3}$/.test(code);

    if (isValid) {
      this.showError = false;
      this.search.emit(code);
    } else {
      this.showError = true;
    }
  }
}
