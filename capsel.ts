let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
spaceship.owner = defaultOwner;
defaultOwner = { firstName: "test", lastName: "test" };

function getDefaultOwner() {
  return defaultOwner;
}

function setDefaultOwner(arg) {
  defaultOwner = arg;
}
