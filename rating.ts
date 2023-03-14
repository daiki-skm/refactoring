const rating = (aDriver) => {
  return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
};

const reportLines = (aCustomer) => {
  const lines: any[] = [];
  lines.push(["name", aCustomer.name]);
  lines.push(["location", aCustomer.location]);
  return lines;
};

const price = (order) => {
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
};
