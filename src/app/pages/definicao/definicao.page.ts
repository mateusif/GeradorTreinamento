import { TreinamentoService } from './../../services/treinamento.service';
import { Treinamento } from './../../interfaces/treinamento';
import { Component, OnInit } from '@angular/core';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ActivatedRoute } from '@angular/router';
import { Movimentos} from 'src/app/interfaces/movimentos';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './definicao.page.html',
  styleUrls: ['./definicao.page.scss'],
})
export class DefinicaoPage implements OnInit {
  private treinamentoId: string = null;
  private movimentoId: string = null;
  public treinamento: Treinamento = {};
  public movimento: Movimentos = {};
  private loading: any;
  private treinamentoSubscription: Subscription;
  private movimentoSubscription: Subscription;


  constructor(
    private treinamentoService: TreinamentoService,
    private movimentoService: MovimentoService,
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
    if (this.treinamentoSubscription) this.treinamentoSubscription.unsubscribe();
  }

  loadTreinamento() {
    this.treinamentoSubscription = this.treinamentoService.getTreinamento(this.treinamentoId).subscribe(data => {
      this.treinamento = data;});
      
      this.movimentoSubscription = this.movimentoService.getMovimentos().subscribe(data => {
      this.movimento = data;
      
      console.log(this.movimento);
    });
  }

  async saveTreinamento() {
    await this.presentLoading();

    //this.exercicios.userId = this.authService.getAuth().currentUser.uid;

    if (this.treinamentoId) {
      try {
        await this.treinamentoService.updateTreinamento(this.treinamentoId, this.treinamento);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.exercicios.createdAt = new Date().getTime();

      try {
        await this.treinamentoService.addTreinamento(this.treinamento);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }
  deleteTreinamento(id:string){
console.log("Ai")
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