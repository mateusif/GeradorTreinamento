import { Treinamento } from './../../interfaces/treinamento';
import { TreinamentoService } from './../../services/treinamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './treinamento.page.html',
  styleUrls: ['./treinamento.page.scss'],
})
export class TreinamentoPage implements OnInit {
  private treinamentoId: string = null;
  public treinamentos: Treinamento = {};
  private loading: any;
  private treinamentosSubscription: Subscription;

  constructor(
    private treinamentoService: TreinamentoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.treinamentoId = this.activatedRoute.snapshot.params['id'];

    if (this.treinamentoId) this.loadTreinamento();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.treinamentosSubscription) this.treinamentosSubscription.unsubscribe();
  }

  loadTreinamento() {
    this.treinamentosSubscription = this.treinamentoService.getTreinamento(this.treinamentoId).subscribe(data => {
      this.treinamentos = data;
    });
  }

  async saveTreinamento() {
    await this.presentLoading();

    //this.exercicios.userId = this.authService.getAuth().currentUser.uid;

    if (this.treinamentoId) {
      try {
        await this.treinamentoService.updateTreinamento(this.treinamentoId, this.treinamentos);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.exercicios.createdAt = new Date().getTime();

      try {
        this.treinamentos.nome ="Demonstração";
        this.treinamentos.movimento = ['Pull Up','Deadlift','Squat','Burpee','Muscle Up'];
        this.treinamentos.repeticao = ['20','48','100','50','10'];
        await this.treinamentoService.addTreinamento(this.treinamentos);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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