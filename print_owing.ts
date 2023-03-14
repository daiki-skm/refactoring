const printOwing = (invoice) => {
  printBanner();

  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  recordDueDate(invoice);

  printDetails(invoice, outstanding);
};

const printBanner = () => {
  console.log("***");
  console.log("* *");
  console.log("***");
};

const printDetails = (invoice, outstanding) => {
  console.log(invoice.customer);
  console.log(outstanding);
  console.log(invoice.dueDate.toLocaleDateString());
};

const recordDueDate = (invoice) => {
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() * 30
  );
};
