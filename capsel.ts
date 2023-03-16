let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
spaceship.owner = defaultOwner;
setDefaultOwner({ firstName: "test", lastName: "test" });

function defaultOwner() {
  return Object.assign({}, defaultOwnerData);
}

function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
