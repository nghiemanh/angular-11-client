import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Content, Song, Data} from '../interface/Song';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {PlayList} from '../interface/PlayList';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private readonly API_DESTINATION = 'http://localhost:8080/api/songs';

  constructor(private httpClient: HttpClient) {
  }

  showSongList(): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}`);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.API_DESTINATION}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  createSong(song: Song): Observable<Song> {
    return this.httpClient.post<Song>(`${this.API_DESTINATION}/new`, song);
  }

  findByName(name: string | undefined): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/?name=${name}`);
  }

  findById(id: number | undefined): Observable<Data> {
    return this.httpClient.get<Data>(`${this.API_DESTINATION}/` + id);
  }
}

