import itemsJSON from "./items.json";

export default class BingoItems {
  items = [];
  constructor() {
    let items = [];

    itemsJSON.forEach((item) => {
      items.push(item["Your new bingo item"]);
    });

    this.items = items;
  }

  shuffle() {
    let currentIndex = this.items.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.items[currentIndex], this.items[randomIndex]] = [
        this.items[randomIndex],
        this.items[currentIndex],
      ];
    }

    // Set free space
    this.items[12] = "Free space";
  }
}
