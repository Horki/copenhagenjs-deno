import { image_to_grayscale, instantiate } from "@/lib/lib_rs.generated.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test({
  name: "test wasm conversion",
  ignore: true,
  permissions: { read: true },
  fn: async () => {
    await instantiate();
    const data = new Uint8Array(14);
    data.set([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 0, 0, 44]);
    const result: string = image_to_grayscale(data);
    assertEquals("data:image/gif;base64,R0lGODlhAQABAAAAACw=", result);
  },
});
