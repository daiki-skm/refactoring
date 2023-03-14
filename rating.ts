const rating = (aDriver) => {
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
};

const moreThanFiveLateDeliveries = (aDriver) => {
  return aDriver.numberOfLateDeliveries > 5;
};
