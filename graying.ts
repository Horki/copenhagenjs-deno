import { image_to_grayscale, instantiate } from "@/lib/lib_rs.generated.js";
import { parseArgs } from "jsr:@std/cli/parse-args";
import { type Args } from "jsr:@std/cli";
import { decodeBase64, type QueueStatus } from "@/util/lib.ts";

function parseArguments(args: string[]): Args {
  // All boolean arguments
  const booleanArgs = [
    "help",
  ];

  // All string arguments
  const stringArgs = [
    "file",
  ];

  // And a list of aliases
  const alias = {
    "help": "h",
    "file": "f",
  };

  return parseArgs(args, {
    alias,
    boolean: booleanArgs,
    string: stringArgs,
    stopEarly: false,
    "--": true,
  });
}

function printHelp(): void {
  console.log(`Usage: graying [OPTIONS...]`);
  console.log("Example: graying -f sample.webp");
  console.log("\nOptional flags:");
  console.log("  -h, --help                Display this help and exit");
  console.log("  -f, --file                Image to grayscale png");
}

if (import.meta.main) {
  // INIT WASM
  await instantiate();

  const args = parseArguments(Deno.args);
  const db: Deno.Kv = await Deno.openKv("data");

  // If help flag enabled, print help.
  if (args.help || !args.file) {
    printHelp();
    Deno.exit(0);
  }

  try {
    const pathResult: string = `output-${args.file.split(".")[0]}.png`;
    console.time(`output: ${pathResult}`);
    const data: Uint8Array = await Deno.readFile(args.file);
    const result: string = image_to_grayscale(data);
    const output: Uint8Array = decodeBase64(result);
    await Deno.writeFile(pathResult, output, {
      create: true,
    });
    console.timeEnd(`output: ${pathResult}`);

    await db.enqueue(
      {
        succeed: true,
        message: `file "${pathResult}" converted`,
      } as QueueStatus,
      {
        delay: 1,
      },
    );
  } catch (e) {
    console.error(e.toString());
    await db.enqueue({ succeed: false, message: e.toString() } as QueueStatus, {
      delay: 1,
    });
  }
}
