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
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
