import { Component, OnInit } from '@angular/core';
import {Song} from '../interface/Song';
import {Track} from 'ngx-audio-player';
import {SongService} from '../_services/song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayListService} from '../_services/play-list.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  id!: number;
  content?: string;
  song?: Song [] = [];
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


  constructor(private songService: SongService,
              private playListService: PlayListService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.songService.findById(this.id).subscribe(result => {
      this.song = result.data.content;
      this.song.map(song => {
        const track = new Track();
        track.link = song.url;
        track.title = song.name;
        this.msaapPlayist.push(track);
      });
    }, error => {
      this.failMessage = ' SHOW SONG LIST FAIL!';
    });
  }
}
