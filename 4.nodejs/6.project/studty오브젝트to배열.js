class MenuGenerator {
  constructor() {
    this.coffee = {
      espresso: 2500,
      americano: 4000,
      latte: 5000,
    };

    this.nonCoffee = {
      blendedTee: 6000,
      orangeJuice: 7000,
      bananaSmoothie: 7500,
    };

    this.desert = {
      lemonCake: 8000,
      waffle: 9000,
    };
  }

  generateMenuList() {
    const result = [];
    for (const [category, items] of Object.entries(this)) {
      for (const [item, price] of Object.entries(items)) {
        result.push([category, item, price]);
      }
    }
    return result;
  }
}

const menu = new MenuGenerator();
console.log(menu.generateMenuList());
