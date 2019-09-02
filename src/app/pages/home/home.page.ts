import { Treinamento } from './../../interfaces/treinamento';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { TreinamentoService } from 'src/app/services/treinamento.service';



@Component({
  selector: 'app-login',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public treinamentos = new Array<Treinamento>();
  private treinamentoSubscription: Subscription;

  constructor(private treinamentoService: TreinamentoService,
    public navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.treinamentoSubscription = this.treinamentoService.getTreinamentos().subscribe(data => {
      this.treinamentos = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //aquele listener do construtor é destruido para evitar problema de memoria ao trocar de pagina
    this.treinamentoSubscription.unsubscribe();
  }
  public openDefinicao() {
    this.navCtrl.navigateForward("/definicao");
  }
  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }
  async deleteExercicio(id: string) {
    try {
      await this.treinamentoService.deleteTreinamento(id);
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
