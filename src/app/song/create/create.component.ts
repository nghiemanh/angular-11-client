import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SongService} from '../../_services/song.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Song} from '../../interface/Song';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private songService: SongService,
              private tokenStorage: TokenStorageService) {
  }

  isLoggedIn = false;
  songList: Song [] = [];
  songForm!: FormGroup;
  successMessage?: string;
  failMessage?: string;
  isSuccessful!: boolean;
  selectedFile!: File;
  imageName: any;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.songForm = new FormGroup(
        {
          name: new FormControl('',
            [Validators.required,
              Validators.minLength(1)]),
          single: new FormControl('',
            [Validators.required,
              Validators.minLength(1)]),
          category: new FormControl('',
            [Validators.required,
              Validators.minLength(1)]),
          file: new FormControl(''),
        }
      );
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    if (this.songForm.valid) {
      const {value} = this.songForm;
      this.songService.createSong(value)
        .subscribe(result => {
          this.songList.push(result);
          this.successMessage = 'successfully !';
        }, error => {
          this.failMessage = 'Fail !';
        });
    }
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.songService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.isSuccessful = true;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.isSuccessful = false;
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }
  onOk(): void{
    window.location.replace('song/list');
  }
}
