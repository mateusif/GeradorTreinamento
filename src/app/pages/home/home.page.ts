import { Exercicios } from './../../interfaces/exercicios';
import { PlanilhaPage } from './../planilha/planilha.page';
import { DefinicaoPage } from './../definicao/definicao.page';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController} from '@ionic/angular';
import { ExerciciosService } from 'src/app/services/exercicios.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public exercicios = new Array<Exercicios>();
  private exerciciosSubscription: Subscription;

  constructor(private exerciciosService : ExerciciosService, 
    public navCtrl:NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController)
     {
    this.exerciciosSubscription = this.exerciciosService.getExercicios().subscribe(data =>{
      this.exercicios = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //aquele listener do construtor é destruido para evitar problema de memoria ao trocar de pagina
    this.exerciciosSubscription.unsubscribe();
  }
  public openDefinicao(){
    console.log("VAI ABRIR");
    this.navCtrl.navigateForward("/definicao");
  }
  public mostrarExistentes(){
    console.log("VAI ABRIR");
    this.navCtrl.navigateForward("/planilha");
  }



  async logout(){
  await this.presentLoading();

  try {
    await this.authService.logout();
  } catch (error) {
    console.error(error);
  } finally {
    this.loading.dismiss();
  }
}
async deleteExercicio(id: string){
  try {
    await this.exerciciosService.deleteExercicios(id);
  } catch (error) {
    this.presentToast('Erro ao tentar deletar');
  }
}
async presentLoading() {
  this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
  return this.loading.present();
}
async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 2000 });
  toast.present();
}
}
