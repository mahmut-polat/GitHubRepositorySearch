import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, IonicModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term if longer than minimum length', fakeAsync(() => {
    spyOn(component.search, 'emit');
    component.searchControl.setValue('angular');
    tick(300); // debounceTime
    expect(component.search.emit).toHaveBeenCalledWith('angular');
  }));

  it('should emit empty string if cleared', fakeAsync(() => {
    spyOn(component.search, 'emit');
    component.searchControl.setValue('');
    tick(300);
    expect(component.search.emit).toHaveBeenCalledWith('');
  }));

  it('should not emit if input is less than 3 characters', fakeAsync(() => {
    spyOn(component.search, 'emit');
    component.searchControl.setValue('ab');
    tick(300);
    expect(component.search.emit).toHaveBeenCalledWith('');
  }));
});
