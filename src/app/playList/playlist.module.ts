import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListComponent} from './list/list.component';
import { CreateComponent } from './create/create.component';
const routes: Routes = [
  {
    path: 'List',
    component: ListComponent
  },
  {
    path: 'Create',
    component: CreateComponent
  }

];
@NgModule({
  declarations: [ListComponent, CreateComponent],
  exports: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SongModule { }

