let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
spaceship.owner = getDefaultOwner;
setDefaultOwner({ firstName: "test", lastName: "test" });

function getDefaultOwner() {
  return defaultOwner;
}

function setDefaultOwner(arg) {
  defaultOwner = arg;
}
