class Province {
  #name: string;
  #producers: Producer[];
  #totalProduction: number;
  #demand: number;
  #price: number;

  constructor(doc: {
    name: string;
    demand: number;
    price: number;
    producers: Producer[];
  }) {
    this.#name = doc.name;
    this.#producers = [];
    this.#totalProduction = 0;
    this.#demand = doc.demand;
    this.#price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg: Producer) {
    this.#producers.push(arg);
    this.#totalProduction += arg.production;
  }

  get name() {
    return this.#name;
  }

  get producers() {
    return this.#producers.slice();
  }

  get totalProduction() {
    return this.#totalProduction;
  }
  set totalProduction(arg) {
    this.#totalProduction = arg;
  }

  get demand() {
    return this.#demand;
  }
  set demand(arg) {
    this.#demand = arg;
  }

  get price() {
    return this.#price;
  }
  set price(arg) {
    this.#price = arg;
  }

  get shortfall() {
    return this.#demand - this.#totalProduction;
  }
}

class Producer {
  #province: Province;
  #cost: number;
  #name: string;
  #production: number;

  constructor(province: Province, data: any) {
    this.#province = province;
    this.#cost = data.cost;
    this.#name = data.name;
    this.#production = data.production || 0;
  }

  get name() {
    return this.#name;
  }

  get cost() {
    return this.#cost;
  }
  set cost(arg) {
    this.#cost = arg;
  }

  get production() {
    return this.#production;
  }
  set production(amount) {
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this.#province.totalProduction += newProduction - this.#production;
    this.#production = newProduction;
  }
}

const sampleProvinceData = () => {
  return {
    name: "Asia",
    producers: [
      { name: "test1", cost: 10, production: 9 },
      { name: "test2", cost: 12, production: 10 },
      { name: "test3", cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
};
