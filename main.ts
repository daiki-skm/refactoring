import { statement } from "./printing.ts";
import type { Invoice } from "./types/invoice.ts";
import type { Plays } from "./types/plays.ts";

if (import.meta.main) {
  const invoiceJson = await Deno.readTextFile("./json/invoice.json");
  const invoice: Invoice = JSON.parse(invoiceJson);
  const playsJson = await Deno.readTextFile("./json/plays.json");
  const plays: Plays = JSON.parse(playsJson);
  const result = statement(invoice, plays);
  console.log(result);
}
