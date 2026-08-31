import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  readonly loading = signal(false);

  readonly message = signal('Loading...');

  show(message = 'Loading...'): void {

    this.message.set(message);

    this.loading.set(true);

  }

  hide(): void {

    this.loading.set(false);

    this.message.set('Loading...');

  }

}