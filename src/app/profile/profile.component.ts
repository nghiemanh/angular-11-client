import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {ProfileService} from '../_services/profile.service';
import {Song} from '../interface/Song';
import {PlayList} from '../interface/PlayList';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  songList: Song [] = [];
  playList: PlayList [] = [];

  constructor(private token: TokenStorageService, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.profileService.showSongByUser(this.currentUser.username)
      .subscribe(
        data => {
          this.songList = data.data.content;
          console.log(data);
        },
        error => {
          console.log(error);
        });
    this.profileService.showPlayListByUserId(this.currentUser.id)
      .subscribe(
        data => {
          this.playList = data.data.content;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
