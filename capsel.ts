let defaultOwnerData = { firstName: "Martin", lastName: "Fowler" };
spaceship.owner = getdefaultOwner;
setDefaultOwner({ firstName: "test", lastName: "test" });

function getdefaultOwner() {
  return defaultOwnerData;
}

function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
