import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  currencyCode = '';
  @Output() search = new EventEmitter<string>();

  onSubmit() {
    if (this.currencyCode.trim()) {
      this.search.emit(this.currencyCode.toUpperCase());
    }
  }
}
