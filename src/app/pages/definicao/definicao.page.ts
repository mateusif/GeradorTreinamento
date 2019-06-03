import { PlanilhaPage } from './../planilha/planilha.page';
import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
@Component({
  selector: 'app-definicao',
  templateUrl: './definicao.page.html',
  styleUrls: ['./definicao.page.scss'],
})
export class DefinicaoPage implements OnInit {
  constructor(public navCtrl:NavController) {}

  ngOnInit() {
  }
resultados(){
  this.navCtrl.navigateForward("/planilha");
}
}
