import { walk } from "jsr:@std/fs/walk";
import { difference } from "jsr:@std/datetime";

Deno.cron("List stats", "*/1 * * * *", async () => {
  const db: Deno.Kv = await Deno.openKv("data");
  const succeed = await db.get(["file", "succeed"]);
  const failed = await db.get(["file", "failed"]);

  console.log(`Logger: Ok: ${succeed.value || 0} | Fail: ${failed.value || 0}`);
});

Deno.cron("Deleting old images", "*/1 * * * *", async () => {
  console.log("Deleting images older than three minutes");
  const now = new Date();
  let count = 0;
  for await (
    const file of walk(".", {
      exts: ["png"],
      match: [/output/],
      includeDirs: false,
      maxDepth: 1,
    })
  ) {
    const stat = await Deno.stat(file.path);
    if (difference(now, stat.birthtime).minutes > 3) {
      console.log(`Deleting: ${file.path}`);
      await Deno.remove(file.path);
      ++count;
    }
  }
  console.log(`Deleted files: ${count}`);
});
