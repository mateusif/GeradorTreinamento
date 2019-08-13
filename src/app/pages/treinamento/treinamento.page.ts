import { MovimentoService } from 'src/app/services/movimento.service';
import { Treinamento } from './../../interfaces/treinamento';
import { TreinamentoService } from './../../services/treinamento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Movimentos } from 'src/app/interfaces/movimentos';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import * as firebase from "firebase/app";
import "firebase/storage";
import { AngularFirestore } from "@angular/fire/firestore";


@Component({
  selector: 'app-details',
  templateUrl: './treinamento.page.html',
  styleUrls: ['./treinamento.page.scss'],
})
export class TreinamentoPage implements OnInit {
  private treinamentoId: string = null;
  public treinamentos: Treinamento = {};
  public movimentos = new Array<Movimentos>();
  public movimento: Movimentos = {};
  public aerobicos: Movimentos = {};
  public levantamentos: Movimentos = {};
  private loading: any;
  private treinamentosSubscription: Subscription;
  private movimentosSubscription: Subscription;

  dados_aerobicos: any
  dados_levantamento: any
  dados_movimentos: any

  public fGroup: FormGroup;
  private treinamentoSubscription: Subscription;

  constructor(
    private treinamentoService: TreinamentoService,
    private movimentosService: MovimentoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fBuilder: FormBuilder,
    private firestore: AngularFirestore
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

  ngOnInit() {
    this.get_dados_aerobicos().subscribe(data => {
      this.dados_aerobicos = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()
        };
      });
      console.log("aerobico: ", this.dados_aerobicos);
    });

    this.get_dados_levantamento().subscribe(data => {
      this.dados_levantamento = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()
        };
      });
      console.log("levantamento: ", this.dados_levantamento);
    });

    this.get_dados_movimentos().subscribe(data => {
      this.dados_movimentos = data.map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()
        };
      });
      console.log("movimentos: ", this.dados_movimentos);
    });

  }

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
    /**
     * if(modalidade == ginastica){
     *   this.movimentosSubscription = this.movimentosService.getMovimentos().subscribe(data => {
         this.movimentos = data;   });
     * trazer a tabela de ginastica pra ca (deve ser parecido como eu coloquei)
     * }
     *if(modalidade == peso){
     * trazer a tabela de peso pra ca (mostrar com console log)
     * }
     *if(modalidade == aerobico){
     * trazer a tabela de exercicios aerobicos pra ca (mostrar com console log)
     * }    
     */

    console.log(this.fGroup.value)
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
        //tirar este treinamento estático.
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

  get_dados_aerobicos() {
    // let currentUser = firebase.auth().currentUser;

    return this.firestore
      .collection("aerobicos")
      .snapshotChanges();
  }

  get_dados_levantamento() {
    // let currentUser = firebase.auth().currentUser;

    return this.firestore
      .collection("levantamento")
      .snapshotChanges();
  }

  get_dados_movimentos() {
    // let currentUser = firebase.auth().currentUser;

    return this.firestore
      .collection("movimentos")
      .snapshotChanges();
  }


}