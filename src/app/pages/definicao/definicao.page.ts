import { Component, OnInit } from '@angular/core';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ActivatedRoute } from '@angular/router';
import { Movimentos } from 'src/app/interfaces/movimentos';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './definicao.page.html',
  styleUrls: ['./definicao.page.scss'],
})
export class DefinicaoPage implements OnInit {
  private movimentoId: string = null;
  public movimento: Movimentos = {};
  private loading: any;
  private movimentosSubscription: Subscription;

  constructor(
    private movimentoService: MovimentoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.movimentoId = this.activatedRoute.snapshot.params['id'];

    if (this.movimentoId) this.loadMovimento();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.movimentosSubscription) this.movimentosSubscription.unsubscribe();
  }

  loadMovimento() {
    this.movimentosSubscription = this.movimentoService.getMovimento(this.movimentoId).subscribe(data => {
      this.movimento = data;
    });
  }

  async saveMovimento() {
    await this.presentLoading();

    //this.exercicios.userId = this.authService.getAuth().currentUser.uid;

    if (this.movimentoId) {
      try {
        await this.movimentoService.updateMovimento(this.movimentoId, this.movimento);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.exercicios.createdAt = new Date().getTime();

      try {
        await this.movimentoService.addMovimento(this.movimento);
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