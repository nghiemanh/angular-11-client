import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Data} from '../interface/Song';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly API_DESTINATION = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  showSongByUser(user: string): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/${user}/songs`);
  }
  showPlayListByUserId(id: number): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/${id}/playlist`);
  }
}
