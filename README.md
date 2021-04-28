# hash_slinging_slasher

![hash slinging slasher](https://static.wikia.nocookie.net/spongebob/images/4/47/Hash.png/revision/latest?cb=20190909014753)

A [Deno](https://deno.land/) library for hashing a data stream.

## Examples

```typescript
import { hash } from "https://deno.land/x/hash_slinging_slasher";

const file = await Deno.open("random.bin");
const computed = await hash(file, "hex", "sha1");

// Computes
console.log(computed);
```
