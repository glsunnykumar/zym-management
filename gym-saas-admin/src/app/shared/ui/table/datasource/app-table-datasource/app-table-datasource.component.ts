import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-app-table-datasource',
  imports: [],
  templateUrl: './app-table-datasource.component.html',
  styleUrl: './app-table-datasource.component.scss'
})
export class AppTableDatasourceComponent<T> {

    private readonly _data = new BehaviorSubject<T[]>([]);

  readonly data$ = this._data.asObservable();

  get data(): T[] {
    return this._data.value;
  }

  set data(value: T[]) {
    this._data.next(value);
  }

  connect() {
    return this.data$;
  }

  disconnect() {
    this._data.complete();
  }

}
