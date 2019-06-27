import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharingDataService<T> {
  public data: T;
  public readonly dataSource: Subject<T>;
  public readonly dataSource$: Observable<T>;

  constructor() {
    this.dataSource = new Subject<T>();
    this.dataSource$ = this.dataSource.asObservable();
  }

  public updateData(source: T) {
    this.data = source;
    this.dataSource.next(source);
  }

  public updateObservable(source: Observable<T>) {
    source.subscribe(data => {
      this.data = data;
      this.dataSource.next(data);
    });
  }
}
