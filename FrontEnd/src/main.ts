import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err))
  .finally(() => {
    const loader = document.querySelector('.loading-overlay') as HTMLElement;
    if(loader) {
      
      setTimeout(() => {
        loader.style.transition = 'opacity 1.5s ease'
      loader.style.opacity = '0';
       
      }, 3000);
      setTimeout(() => {
        loader.remove();
      }, 4500);
    }
  })
