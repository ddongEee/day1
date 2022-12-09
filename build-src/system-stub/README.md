# system-stub

The simple stubbing suite for day1

## Quick Start

```bash
# (option) Refresh caching on Yarn Berry
yarn cache clean # --all

# Prepare dependencies with Yarn Berry
yarn install --check-cache # --immutable --immutable-cache
```

```bash
# Open new terminal, then set environment variables from .env
export $(cat .env) && printenv | grep MB
```

> ### [Caution!]
>
> Cause of using mb(bin) in yarn command, could not shim dotenv.  
> So, use clean ternimal that is not manually set other environment variables.

### Turn `ON` the Stub

```bash
# Run a mutable stub
yarn run stub
```

### Turn `ON` the recording

```bash
# Run a clean imposter
yarn start

# Export recorded data in the running imposter (include backup)
yarn run capture # export at temp/mark-record.ejs

# Run a memorized imposter
yarn run reload:mark # start from temp/mark-record.ejs
yarn run reload:auto # start from temp/auto-record.ejs

# Remove all proxies in running imposter
yarn run replay

# Stop the running imposter with auto exporting
yarn stop # export at temp/auto-record.ejs
```
