---
title: Reloading quota
description: Reload quota files without restarting Ggr UI by sending SIGHUP.
---

To **reload quota files** just send **SIGHUP** to process or Docker container:

```bash
kill -HUP <pid>
docker kill -s HUP <container-id-or-name>
```

:::note
Use only one of these commands depending on whether you have Docker installed.
:::
