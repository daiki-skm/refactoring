import { assertEquals } from "std/testing/asserts.ts";
import { Province, sampleProvinceData } from "./province.ts";

Deno.test("province shortfall", () => {
  const asia = new Province(sampleProvinceData());
  assertEquals(asia.shortfall, 5);
});
