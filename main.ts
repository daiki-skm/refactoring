import { statement } from "./printing.ts";

if (import.meta.main) {
  const invoiceJson = await Deno.readTextFile("./json/invoice.json");
  const invoice = JSON.parse(invoiceJson);
  const playJson = await Deno.readTextFile("./json/play.json");
  const play = JSON.parse(playJson);
  const result = statement(invoice, play);
  console.log(result);
}
