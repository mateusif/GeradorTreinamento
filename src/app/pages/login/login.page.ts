import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public alert: AlertController,
    public keyboard: Keyboard) {

  }

  ngOnInit() {
  }


  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }

  }
  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      this.showAlert("Sucesso!", "Bem-vido")
    } catch (error) {
      // this.presentToast(error.message);
      this.showAlert("Erro!", error.message)
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    // const { password, passwordv } = this
    // if (password != passwordv) {
    //   this.showAlert("Erro!", "Senhas nao batem")
    //   return console.log("Senhas nao batem")
    // }

    try {
      await this.authService.register(this.userRegister);
      this.showAlert("Sucesso!", "Bem-vido")
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = "Email já está em uso";
          break;
        case 'auth/invalid-email':
          message = "Email inválido";
          break;
      }
      // this.presentToast(message);
      this.showAlert("Erro!", error.message);
    } finally {
      this.loading.dismiss();
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

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    })

    await alert.present()

  }

}
