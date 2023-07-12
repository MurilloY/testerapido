import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {

  dadosEnviados: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
