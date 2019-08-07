import { Treinamento } from './../../interfaces/treinamento';
import { TreinamentoService } from './../../services/treinamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Movimentos } from 'src/app/interfaces/movimentos';
import { MovimentoService } from 'src/app/services/movimento.service';
import { AerobicosService } from 'src/app/services/aerobicos.service';
import { LevantamentoService } from 'src/app/services/levantamento.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-details',
  templateUrl: './treinamento.page.html',
  styleUrls: ['./treinamento.page.scss'],
})
export class TreinamentoPage implements OnInit {
  private treinamentoId: string = null;
  public treinamentos: Treinamento = {};
  public treinamento: Treinamento = {};
  public movimento: Movimentos = {};
  public aerobicos: Movimentos = {};
  public levantamentos: Movimentos = {};
  private loading: any;
  private treinamentosSubscription: Subscription;
  private movimentoSubscription: Subscription;
  private levantamentoSubscription: Subscription
  private aerobicoSubscription: Subscription;

  public fGroup: FormGroup;

  constructor(
    private treinamentoService: TreinamentoService,
    private movimentoService: MovimentoService,
    private aerobicoService: AerobicosService,
    private levantamentoService: LevantamentoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private fBuilder: FormBuilder,
  ) {
    // pagina inteira
    this.fGroup = this.fBuilder.group({
      modal_opcao: [
        null,
        Validators.compose([Validators.required])
      ],
      temp_opcao: [
        null,
        Validators.compose([Validators.required])
      ],
      repet_opcao: [
        null,
        Validators.compose([Validators.required])
      ],
      esq_opcao: [
        null,
        Validators.compose([Validators.required])
      ],
      prio_opcao: [
        null,
        Validators.compose([Validators.required])
      ],
    })

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
    ///AQUI VAI A CADEIA DE IF PARA TESTAR OQ FOI SELECIONADO NO FORM
    //Dar console.log() aqui do que é selecionado no form
    console.log(this.fGroup.value)


    //mostra tudo que tem no banco, todos exercicios de todas as modalidades
    this.movimentoSubscription = this.movimentoService.getMovimentos().subscribe(data => {
      // this.movimento = data;
      console.log(this.movimento);
    });

    this.levantamentoSubscription = this.levantamentoService.getLevantamentos().subscribe(data => {
      // this.levantamentos = data;
      console.log(this.levantamentos);
    });

    this.aerobicoSubscription = this.aerobicoService.getAerobicos().subscribe(data => {
      // this.aerobicos = data;
      console.log(this.aerobicos);
    });



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
        this.treinamentos.nome = "Demonstração";
        this.treinamentos.movimento = ['Pull Up', 'Deadlift', 'Squat', 'Burpee', 'Muscle Up'];
        this.treinamentos.repeticao = ['20', '48', '100', '50', '10'];
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