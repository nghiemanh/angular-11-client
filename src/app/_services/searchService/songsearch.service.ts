import { Injectable } from '@angular/core';
import {Song} from '../../interface/Song';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsearchService {
  song: Song [] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.song);

  constructor() { }

  changeValue(message: string, song: Song[]): void {
    this.value.next(message);
    this.list.next(song);
  }
}
