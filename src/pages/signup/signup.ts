import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  onSignup(f: NgForm) {
    const spinner = this.loadingCtrl.create({
      content: 'Signing you up ...'
    });
    spinner.present();
    this.authService.signup(f.value.email, f.value.password)
      .then(data => {
        spinner.dismiss();
      })
      .catch(error => {
        const alert = this.alertCtrl.create({
          title: 'Signing up',
          message: error.message,
          buttons: ['Ok']
        });
        spinner.dismiss();
        alert.present();
      });
  }

}
