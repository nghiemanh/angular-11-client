import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PlayList} from '../../interface/PlayList';

@Injectable({
  providedIn: 'root'
})
export class PlaylistSearchService {
  playLists: PlayList [] = [];
  value = new BehaviorSubject('');
  list = new BehaviorSubject(this.playLists);

  constructor() { }

  changeValue(message: string, playLists: PlayList[]): void {
    this.value.next(message);
    this.list.next(playLists);
  }
}
