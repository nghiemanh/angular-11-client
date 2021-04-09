import {Component, OnInit} from '@angular/core';
import {PlayList} from '../../interface/PlayList';
import {PlayListService} from '../../_services/play-list.service';
import {PlaylistSearchService} from '../../_services/searchService/playlistSearch.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  playList: PlayList [] = [];
  playListName?: any;
  failMessage?: string;
  currentUser: any;

  constructor(private playListService: PlayListService,
              private playListSearchService: PlaylistSearchService,
              private token: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.playListService.showPlayListByUserId(this.currentUser.id).subscribe(result => {
      this.playList = result.data.content;
    }, error => {
      this.failMessage = ' SHOW SONG LIST FAIL!';
    });
  }
  playListSong(listId: number): void{
    this.router.navigate(['playerList', listId]);
  }

  search(): void {
    if (this.playListName !== '') {
      this.playListService.findPlayListByName(this.playListName).subscribe(data => {
        this.playList = data.data.content;
        this.playListSearchService.changeValue(this.playListName, this.playList);
      });
    } else {
      this.playListService.showPlayList().subscribe(data => {
        this.playList = data.data.content;
        this.playListSearchService.changeValue(this.playListName, this.playList);
      });
    }
  }

  delete(userId: number, playListId: number): void{
    this.playListService.deletePlayList(userId, playListId).subscribe(value => {
      this.ngOnInit();
    });
  }

  reload(): void{
    window.location.reload();
  }
}
