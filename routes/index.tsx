// import { useSignal } from "@preact/signals";
import ImageConverter from "../islands/ImageConverter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  data: Uint8Array;
}

export const handler: Handlers<Data | null> = {
  async GET(_request, context) {
    const data: Uint8Array = await Deno.readFile("./sample.webp");

    return context.render({ data });
  },
};

export default function Home(context: PageProps<Data | null>) {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Gray logo: a wasm converter in web"
        />
        <h1 class="text-4xl font-bold">Welcome to Grayer APP</h1>
        <ImageConverter dataArray={context.data} />
      </div>
    </div>
  );
}
