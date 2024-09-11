import { assertEquals } from "jsr:@std/assert";
import { decodeBase64 } from "./lib.ts";

Deno.test("testing utils", () => {
  const base64 = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
  const result = new Uint8Array(14);
  result.set([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 0, 0, 44]);
  const decode = decodeBase64(base64);
  assertEquals(decode, result);
});
