import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, PopoverController, AlertController} from 'ionic-angular';
import {NewRecipePage} from "../new-recipe/new-recipe";
import {RecipesService} from "../../services/recipes";
import {Recipe} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";
import {StoragePopoverPage} from "../sl-storage-popover/storage-popover";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(
    private navCtrl: NavController,
    private recipesService: RecipesService,
    private popCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private auth: AuthService
  ){}

  onNewRecipe() {
    this.navCtrl.push(NewRecipePage, { mode: 'new' });
  }

  getRecipes():Recipe[] {
      return this.recipesService.get();
  }

  onLoadRecipe(i: number) {
      this.navCtrl.push(RecipePage, this.recipesService.get()[i]);
  }

  onShowPopover(event) {
    const popover = this.popCtrl.create(StoragePopoverPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      }
      if (data.action == 'load') {
        const spinner = this.loadingCtrl.create({
          content: 'Loading data ...'
        });
        spinner.present();
        this.auth.getActiveUser().getToken()
          .then((token: string) => {
            this.recipesService.fetchRecipes(token)
              .subscribe(
                () => {
                  spinner.dismiss();
                },
                error => {
                  this.alertCtrl.create({
                    title: 'Error',
                    subTitle: error.json().error,
                    buttons: ['Ok']
                  }).present();
                });
          });
      } else if (data.action == 'save') {
        const spinner = this.loadingCtrl.create({
          content: 'Saving data ...'
        });
        spinner.present();
        this.auth.getActiveUser().getToken()
          .then((token: string) => {
            this.recipesService.storeRecipes(token)
              .subscribe(
                () => {
                  spinner.dismiss();
                },
                error => {
                  this.alertCtrl.create({
                    title: 'Error',
                    subTitle: error.json().error,
                    buttons: ['Ok']
                  }).present();
                });
          });
      }
    });
  }


}
