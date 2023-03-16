let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
spaceship.owner = defaultOwner;
setDefaultOwner({ firstName: "test", lastName: "test" });

function defaultOwner() {
  return new Person(defaultOwnerData);
}

function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }
  get lastName() {
    return this._lastName;
  }
  get firstName() {
    return this._firstName;
  }
}

const station = {
  name: "test",
  readings: [
    { temp: 43, time: "2022-11-11 10:10" },
    { temp: 43, time: "2022-11-11 10:10" },
  ],
};

function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

let reading = { customer: "test", quantity: 10, month: 2, year: 2002 };
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;
const taxableCharge = Math.max(
  0,
  aReading.baseCharge - taxThreshold(aReading.year)
);

class Reading {
  constructor(data) {
    this.customer = data.customer;
    this.quantity = data.quantity;
    this.month = data.month;
    this.year = data.year;
  }
  get customer() {
    return this.customer;
  }
  get quantity() {
    return this.quantity;
  }
  get month() {
    return this.month;
  }
  get year() {
    return this.year;
  }
  get baseCharge() {
    return baseRate(this.month - this.year) * this.quantity;
  }
}
