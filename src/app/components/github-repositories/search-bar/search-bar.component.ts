import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  styleUrls: ['./search-bar.component.scss'],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('');

  private destroy$ = new Subject<void>();
  private readonly MIN_SEARCH_LENGTH = 3;

  ngOnInit(): void {
    this.setupSearchListener();
  }

  private setupSearchListener(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(value => typeof value === 'string' ? value.trim() : ''),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (trimmedValue: string) => {
        if (trimmedValue.length >= this.MIN_SEARCH_LENGTH || trimmedValue.length === 0) {
          this.search.emit(trimmedValue);
        } else {
          this.search.emit('');
        }
      },
      error: (err) => {
        console.error('Error in search stream:', err);
      }
    });
  }
}
