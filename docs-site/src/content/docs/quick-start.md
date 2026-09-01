---
title: Quick start guide
description: Start Ggr UI against a quota directory and point WebSummoner UI at it.
---

1. Prerequisites:
   - One or more [WebSummoner](https://github.com/WebSummoner/websummoner) hosts
   - A directory with [XML quota files](https://websummoner.github.io/ggr/guides/quota-files/) for Ggr

2. Start Ggr UI binary or container:

   ```bash
   ./ggr-ui -quota-dir /path/to/quota/dir # As a binary

   docker run -d --name ggr-ui -p 8888:8888 -v /path/to/quota/dir:/etc/grid-router/quota:ro websummoner/ggr-ui:latest-release
   ```

   Binaries as usually can be downloaded from
   [releases page](https://github.com/WebSummoner/ggr-ui/releases).

3. Now start [WebSummoner UI](https://github.com/WebSummoner/websummoner-ui)
   and point it to `http://localhost:8888`. It should start showing sessions
   running anywhere in Selenium cluster behind Ggr.

   :::note
   If you are linking WebSummoner UI and Ggr UI containers, then URI should be
   `http://<ggr-ui-container-name>:8888`, e.g. `http://ggr-ui:8888`.
   :::

4. You can also use `/status` API similarly to WebSummoner
   [/status](https://websummoner.github.io/websummoner/) API:

   ```bash
   curl -s http://localhost:8888/status
   ```
