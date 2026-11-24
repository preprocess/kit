# @preprocess/runmode

The one reader of the deployment variable (`PREPROCESS_REGION`). Unset means a
self-hosted install; set means our cloud, in that region. Products read the run
mode here and nowhere else.

```ts
import { runMode } from "@preprocess/runmode";

const mode = runMode(env); // { kind: "cloud", region } | { kind: "self-hosted" }
```
