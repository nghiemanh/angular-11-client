import {Component, OnInit} from '@angular/core';
import {PlayListService} from '../../_services/play-list.service';
import {PlayList} from '../../interface/PlayList';
import {TokenStorageService} from '../../_services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  playList: PlayList [] = [];

  constructor(private playListService: PlayListService, private token: TokenStorageService, private router: Router) {
  }

  currentUser: any;
  isLoggedIn = false;
  playlistForm!: FormGroup;
  successMessage!: string;
  failMessage!: string;

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.playlistForm = new FormGroup(
        {
          name: new FormControl('', [Validators.required,
            Validators.minLength(1)])
        }
      );
    }
  }

  onSubmit(): void {
    if (this.playlistForm.valid) {
      this.currentUser = this.token.getUser();
      const {value} = this.playlistForm;
      this.playListService.createPlayList(this.currentUser.id, value).subscribe(result => {
        this.playList.push(result);
        this.successMessage = 'successfully!';
        this.router.navigate(['playlist/List']);
      }, error => {
        this.failMessage = 'Fail !';
      });
    }
  }


}
