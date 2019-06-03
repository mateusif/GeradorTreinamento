import { PlanilhaPage } from './../planilha/planilha.page';
import { DefinicaoPage } from './../definicao/definicao.page';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(public navCtrl:NavController) {}

  ngOnInit() {
  }
  public openDefinicao(){
    console.log("VAI ABRIR");
    this.navCtrl.navigateForward("/definicao");
  }
  public mostrarExistentes(){
    console.log("VAI ABRIR");
    this.navCtrl.navigateForward("/planilha");
  }

}
