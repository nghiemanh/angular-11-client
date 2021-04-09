import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Data, Song} from '../interface/Song';
import {PlayList} from '../interface/PlayList';
import {DataList, SongList} from '../interface/SongList';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  private readonly API_DESTINATION = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
  }

  createPlayList(id: number, playList: PlayList): Observable<PlayList> {
    return this.httpClient.post<PlayList>(`${this.API_DESTINATION}/${id}/playlist/new`, playList);
  }

  showPlayList(): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/playlist`);
  }

  deletePlayList(userId: number, playListId: number): Observable<PlayList> {
    return this.httpClient.delete<PlayList>(`${this.API_DESTINATION}/user/${userId}/playList/${playListId}`);
  }

  addSongToPlaylist(playListId: number, songId: number | undefined, song: Song[] | undefined): Observable<PlayList> {
    return this.httpClient.post<PlayList>(`${this.API_DESTINATION}/playlist/${playListId}/song/${songId}`, song);
  }

  findPlayListByName(name: string): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/playlist?name=${name}`);
  }

  findPlayListById(id: number | undefined): Observable<DataList> {
    return this.httpClient.get<DataList>(`${this.API_DESTINATION}/playlist/${id}`);
  }

  showPlayListByUserId(id: number): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/${id}/playlist`);
  }
}
