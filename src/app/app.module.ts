import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { RecipesPageModule } from "../pages/recipes/recipes.module";
import { ShoppingListPageModule } from "../pages/shopping-list/shopping-list.module";
import {NewRecipePageModule} from "../pages/new-recipe/new-recipe.module";
import {RecipePageModule} from "../pages/recipe/recipe.module";
import {ShoppingList} from "../services/shopping.list";
import {RecipesService} from "../services/recipes";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    RecipesPageModule,
    ShoppingListPageModule,
    NewRecipePageModule,
    RecipePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingList,
    RecipesService
  ]
})
export class AppModule {}
