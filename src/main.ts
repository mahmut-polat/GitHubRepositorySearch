import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { searchReducer } from './app/store/reducers/search.reducer';
import { provideEffects } from '@ngrx/effects';
import { SearchEffects } from './app/store/effects/search.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';


bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideStore({ search: searchReducer }),
    provideEffects([SearchEffects]),
    provideHttpClient(),
  ],
});
