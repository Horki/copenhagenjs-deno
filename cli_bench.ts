import { image_to_grayscale, instantiate } from "@/lib/lib_rs.generated.js";

Deno.bench({
  ignore: true,
  name: "bench wasm conversion",
  permissions: { read: true },
  fn: async (): Promise<void> => {
    await instantiate();
    const data = new Uint8Array(14);
    data.set([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 0, 0, 44]);
    image_to_grayscale(data);
  },
});
