const printOwing = (invoice) => {
  const printDetails = () => {
    console.log(invoice.customer);
    console.log(outstanding);
    console.log(invoice.dueDate.toLocaleDateString());
  };

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

  printDetails();
};

const printBanner = () => {
  console.log("***");
  console.log("* *");
  console.log("***");
};