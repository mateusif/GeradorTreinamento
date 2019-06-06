import { Component, OnInit } from '@angular/core';
import { ExerciciosService } from 'src/app/services/exercicios.service';
import { ActivatedRoute } from '@angular/router';
import { Exercicios } from 'src/app/interfaces/exercicios';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './definicao.page.html',
  styleUrls: ['./definicao.page.scss'],
})
export class DefinicaoPage implements OnInit {
  private exerciciosId: string = null;
  public exercicios: Exercicios = {};
  private loading: any;
  private exerciciosSubscription: Subscription;

  constructor(
    private exerciciosService: ExerciciosService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.exerciciosId = this.activatedRoute.snapshot.params['id'];

    if (this.exerciciosId) this.loadExercicios();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.exerciciosSubscription) this.exerciciosSubscription.unsubscribe();
  }

  loadExercicios() {
    this.exerciciosSubscription = this.exerciciosService.getExercicio(this.exerciciosId).subscribe(data => {
      this.exercicios = data;
    });
  }

  async saveExercicios() {
    await this.presentLoading();

    //this.exercicios.userId = this.authService.getAuth().currentUser.uid;

    if (this.exerciciosId) {
      try {
        await this.exerciciosService.updateExercicio(this.exerciciosId, this.exercicios);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.exercicios.createdAt = new Date().getTime();

      try {
        await this.exerciciosService.addExercicios(this.exercicios);
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