import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TreinamentoPage } from './treinamento.page';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";


const routes: Routes = [
  {
    path: '',
    component: TreinamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TreinamentoPage]
})
export class TreinamentoPageModule { }
