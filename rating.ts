const rating = (aDriver) => {
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
};

const reportLines = (aCustomer) => {
  const lines: any[] = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
};
