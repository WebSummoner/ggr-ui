---
title: Contributing & development
description: Build Ggr UI from source, build its Docker image, and work on these docs.
---

To build Ggr UI:

1. Install [Go](https://go.dev/doc/install) 1.27 or newer — the module
   declares `go 1.27`, so older toolchains cannot build it.

2. Clone Ggr UI source:

   ```bash
   git clone https://github.com/WebSummoner/ggr-ui.git
   ```

3. Go to project directory:

   ```bash
   cd ggr-ui
   ```

4. Build source:

   ```bash
   go build
   ```

   This will also automatically fetch dependencies.

5. Run Ggr UI:

   ```bash
   ./ggr-ui --help
   ```

:::tip
To build Docker container type:

```bash
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build
docker build -t ggr-ui:latest .
```
:::

## Documentation

These docs are an [Astro Starlight](https://starlight.astro.build/) site under
`docs-site/`. Node is not required on your machine — run it in a container:

```bash
docker run --rm -it -v "$PWD/docs-site":/app -w /app -p 4321:4321 \
    node:24 sh -c 'npm install && npm run dev -- --host'
```

To produce the static site exactly as CI does:

```bash
docker run --rm -v "$PWD/docs-site":/app -w /app node:24 \
    sh -c 'npm ci && npm run build'
```
