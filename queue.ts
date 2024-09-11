import { QueueStatus } from "@/util/lib.ts";

if (import.meta.main) {
  const db = await Deno.openKv("data");

  await db.listenQueue(async (msg: QueueStatus) => {
    console.log(msg);
    await db.atomic().mutate({
      type: "sum",
      key: ["file", msg.succeed ? "succeed" : "failed"],
      value: new Deno.KvU64(1n),
    }).commit();
  });
}
