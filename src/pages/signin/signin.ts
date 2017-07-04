import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  onLogin(f: NgForm) {
    console.log(`${f.value.email} ${f.value.password}`);
    const spinner = this.loadingCtrl.create({
      content: 'Signing in you ...'
    });
    spinner.present();
    this.authService.signin(f.value.email, f.value.password)
      .then(data => {
        spinner.dismiss();
      })
      .catch(error => {
        spinner.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
