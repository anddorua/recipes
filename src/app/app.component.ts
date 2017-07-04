import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from "../pages/tabs/tabs";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";

import firebase from "firebase";
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signupPage: any = SignupPage;
  signinPage: any = SigninPage;
  isAuthenticated: boolean = false;

  @ViewChild('content') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyBM__9BINv-10evLywbmXDzwywCfR6pjA8",
      authDomain: "ionic2-recipes.firebaseapp.com",
      databaseURL: "https://ionic2-recipes.firebaseio.com",
      projectId: "ionic2-recipes",
      storageBucket: "ionic2-recipes.appspot.com",
      messagingSenderId: "356907871026"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = this.signinPage;
      }
    });
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage);
  }
}

