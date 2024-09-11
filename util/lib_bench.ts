import { decodeBase64 } from "./lib.ts";

Deno.bench("utils benching", () => {
  const base64 = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
  decodeBase64(base64);
});
