import {Component, OnInit} from '@angular/core';

import {SongService} from '../../_services/song.service';
import {Song} from '../../interface/Song';
import {SongsearchService} from '../../_services/searchService/songsearch.service';
import {Router} from '@angular/router';
import {PlayListService} from '../../_services/play-list.service';
import {PlayList} from '../../interface/PlayList';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  songList: Song [] = [];
  song?: Song [] = [];
  name: any;
  playList: PlayList [] = [];
  isSuccessful!: boolean;
  failMessage!: string;
  currentUser: any;
  songId?: number;
  timer!: number;
  isLoggedIn = false;

  constructor(private songService: SongService,
              private songSearchService: SongsearchService,
              private playListService: PlayListService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.songService.showSongList().subscribe(result => {
      this.songList = result.data.content;
    }, error => {
      this.failMessage = ' SHOW SONG LIST FAIL!';
    });
  }

  playSong(id: number): void {
    this.router.navigate(['player', id]);
  }

  addSongToPlayList(playListId: number): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.playListService.addSongToPlaylist(playListId, this.songId, this.song).subscribe(result => {
        this.isSuccessful = true;
        this.timer = setTimeout(() => {
          window.close();
        }, 2000);
      }, error => {
        this.isSuccessful = false;
      });
    }
  }
  checkLogin(): void{
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
  }
  getPlayList(id: number): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.songId = id;
      this.currentUser = this.token.getUser();
      this.playListService.showPlayListByUserId(this.currentUser.id).subscribe(result => {
        this.playList = result.data.content;
      }, error => {
        this.failMessage = ' SHOW SONG LIST FAIL!';
      });
    }
  }
  reLoad(): void{
    window.location.replace('/playlist/Create');
  }

  search(): void {
    if (this.name !== '') {
      this.songService.findByName(this.name).subscribe(data => {
        this.songList = data.data.content;
        this.songSearchService.changeValue(this.name, this.songList);
      });
    } else {
      this.songService.showSongList().subscribe(data => {
        this.songList = data.data.content;
        this.songSearchService.changeValue(this.name, this.songList);
      });
    }
  }
}
