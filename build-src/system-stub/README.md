# system-stub

The simple stubbing suite for day1

## Quick Start

```bash
# (option) Refresh caching on Yarn Berry
yarn cache clean # --all

# Prepare dependencies with Yarn Berry
yarn install --check-cache # --immutable --immutable-cache
```

> ### [Caution!]
>
> Cause of using mb(bin) in yarn command, could not shim dotenv.  
> So, use clean ternimal that is not manually set other environment variables.

### Turn `ON` the recording

```bash
# Run a clean imposter
yarn start

# Call to server from client through imposter.
# The client set the this imposter's port number.

# Remove all proxies in running imposter
yarn run replay

# Export recorded data in the running imposter (include backup)
yarn run capture # export at temp/mark-record.ejs

# Stop the running imposter with auto exporting
yarn run stop # export at temp/auto-record.ejs

# Run a memorized imposter
yarn run reload:mark # start from temp/mark-record.ejs
yarn run reload:auto # start from temp/auto-record.ejs
```

### After record

```bash
# Set environment variable
export $(cat .env) && printenv | grep MB

# Create new stub from recorded data,
# Then replace previous stub with backup.
# (check temp/baks foler)
./replace-stub.sh
```

### Turn `ON` the Stub

```bash
# Set environment variable
export $(cat .env) && printenv | grep MB

# Run a mutable stub
yarn run stub
```
