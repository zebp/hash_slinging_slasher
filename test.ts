import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { hash, hashSync } from "./mod.ts";

// We rely on the standard libraries hashing internally, so if these two test pass it's safe to
// assume the hashing is correct.

Deno.test({
  name: "md5 hex sync",
  fn: () => {
    const file = Deno.openSync("testdata/random.bin");
    const hashHex = hashSync(file, "hex", "md5");
    assertEquals(hashHex, "d72a01c66a645b8057d6c338c9d3f148");
    file.close();
  },
});

Deno.test({
  name: "md5 hex async",
  fn: async () => {
    const file = await Deno.open("testdata/random.bin");
    const hashHex = await hash(file, "hex", "md5");
    assertEquals(hashHex, "d72a01c66a645b8057d6c338c9d3f148");
    file.close();
  },
});
