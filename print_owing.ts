const printOwing = (invoice) => {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
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

const calculateOutstanding = (invoice) => {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
};
