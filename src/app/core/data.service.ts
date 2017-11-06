import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';

import { Socket } from '../shared/interfaces';

declare var io : {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {

  socket: Socket;
  observer: Observer<number>;

  getQuotes() : Observable<number> {
    this.socket = io.connect('http://localhost:8080');

    this.socket.on('data', (res) => {
      this.observer.next(res.data);
    });

    return this.createObservable();
  }

  createObservable() : Observable<number> {
      return Observable.create((observer: Observer<number>) => {
        this.observer = observer;
      });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        let errMessage = error.error.message;
        return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }

}
