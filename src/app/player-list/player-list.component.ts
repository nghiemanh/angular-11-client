import { Component, OnInit } from '@angular/core';
import {PlayList} from '../interface/PlayList';
import {Track} from 'ngx-audio-player';
import {PlayListService} from '../_services/play-list.service';
import {ActivatedRoute} from '@angular/router';
import {SongList} from '../interface/SongList';
import {Song} from '../interface/Song';


@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  id!: number;
  listId?: number;
  content?: string;
  songList?: SongList [] = [];
  failMessage!: string;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [10, 20, 30];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = true;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;
  msaapPlayist: Track[] = [];

  constructor( private playListService: PlayListService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listId = this.route.snapshot.params.listId;
    this.playListService.findPlayListById(this.listId).subscribe(data => {
      this.songList = data.data.content[0].song;
      console.log(data);
      this.songList.map(song => {
        const track = new Track();
        track.title = song.name;
        track.link = song.url;
        this.msaapPlayist.push(track);
      });
    }, error => {
      this.failMessage = ' SHOW PLAYLIST FAIL!';
    });
  }
}
