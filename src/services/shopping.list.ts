import {Ingredient} from "../models/ingredient";

export class ShoppingList {
  private sl: Ingredient[] = [];

  add(product: string, amount: number) {
    let index = this.sl.findIndex(item => item.name == product);
    if (index >= 0) {
      this.sl[index].amount += amount;
    } else {
      this.sl.push(new Ingredient(product, amount));
    }
  }

  addItems(items: Ingredient[]) {
    items.forEach(item => { this.add(item.name, item.amount); });
  }

  remove(product: string, amount: number) {
    let index = this.sl.findIndex(item => item.name == product);
    if (index >= 0) {
      this.sl[index].amount -= amount;
      if (this.sl[index].amount == 0) {
        this.sl.splice(index, 1);
      }
    }
  }

  get():Ingredient[] {
    return [].concat(this.sl);
  }
}
