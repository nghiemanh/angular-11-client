import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {HeaderComponent} from './header/header.component';
import {PlayerComponent} from './player/player.component';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {SongModule} from './song/song.module';
import {ListComponent} from './song/list/list.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'player/:id', component: PlayerComponent},
  {path: 'playerList/:listId', component: PlayerListComponent},
  {path: '', component: ListComponent},
  {path: 'playlist', loadChildren: () => import('./playList/playlist.module').then(m => m.SongModule)},
  {path: 'song', loadChildren: () => import('./song/song.module').then(m => m.SongModule)},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    HeaderComponent,
    PlayerComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxAudioPlayerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
