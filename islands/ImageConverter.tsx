import { useEffect, useRef } from "preact/hooks";
import { Button } from "@/components/Button.tsx";
import { image_to_grayscale, instantiate } from "@/lib/lib_rs.generated.js";
import { encodeBase64 } from "@/util/lib.ts";

interface ImageProps {
  dataArray: Uint8Array;
}

export default function ImageConverter({ dataArray }: ImageProps) {
  const imageElement = useRef<HTMLImageElement>(null);
  const imageElementGray = useRef<HTMLImageElement>(null);

  useEffect((): void => {
    if (imageElement.current) {
      const base64: string = encodeBase64(dataArray);
      imageElement.current.src = base64;
    }
  }, [dataArray]);

  return (
    <div class="flex gap-8 py-6">
      <Button
        onClick={(): void => {
          instantiate({
            // TODO: For some reason it is not serving wasm file out of the box
            url: new URL("http://localhost:3000/lib_rs_bg.wasm"),
          }).then((): void => {
            console.time("converting");
            const base64: string = image_to_grayscale(dataArray.data);
            imageElementGray.current.src = base64;
            console.timeEnd("converting");
          }).catch(console.error);
        }}
      >
        Convert
      </Button>
      <img
        ref={imageElement}
        loading="eager"
        decoding="async"
        height="256"
        width="256"
      />
      <img
        ref={imageElementGray}
        loading="eager"
        decoding="async"
        height="256"
        width="256"
      />
    </div>
  );
}
