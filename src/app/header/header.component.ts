import {Component, Input, OnInit, Output} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Song} from '../interface/Song';
import {SongService} from '../_services/song.service';
import {Router} from '@angular/router';
import {DataService} from '../_services/data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  songList: Song [] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  name?: string;
  song?: Song;
  page?: number;
  size?: number;

  constructor(private data: DataService, private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ADMIN');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.replace('/song/list');
  }
}
