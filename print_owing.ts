const printOwing = (invoice) => {
  let outstanding = 0;

  printBanner();

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() * 30
  );

  console.log(invoice.customer);
  console.log(outstanding);
  console.log(invoice.dueDate.toLocaleDateString());
};

const printBanner = () => {
  console.log("***");
  console.log("* *");
  console.log("***");
};
