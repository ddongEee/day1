# HISTORY

- [HISTORY](#history)
  - [Environment](#environment)
  - [Project](#project)
    - [Initiation](#initiation)
    - [Set dependencies](#set-dependencies)

## Environment

1. [Install nvm(Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating)

   ```bash
   # Check
   nvm --version
   ```

2. Install node environment

   ```bash
   # Setup node manager
   nvm install --lts 18

   # Check
   nvm current
   nvm list --no-alias
   node --version

   # Check
   npm --version
   yarn --version

   # Setup package manger
   npm install --global npm   # Maybe need to set tslint.json version. Please check the console
   npm install --global yarn

   ```

## Project

### Initiation

```bash
cd build-src/system-behavior/

# Initialize
yarn init -2

# Set node version with nvm
touch .nvmrc # edit the file
```

### Set dependencies

```bash
# Yarn berry with VScode
yarn add --dev @yarnpkg/sdks
yarn dlx @yarnpkg/sdks vscode

# Typescript
yarn add --dev typescript tsconfig-paths ts-node
yarn add --dev @types/node

# Chai: Assertion
yarn add --dev chai @types/chai

# Pactum: REST API Tester
yarn add --dev pactum

# Cucumber: BDD
yarn add --dev @cucumber/cucumber @types/cucumber cucumber-tsflow
yarn add --dev @cucumber/pretty-formatter

# Reporter for Cucumber
yarn add --dev multiple-cucumber-html-reporter

# etc.
yarn add dotenv
yarn add --dev prettier lint-staged tslint tslint-config-prettier
yarn add --dev loglevel
```

- Set [`tsconfig.json`](tsconfig.json) for typescript

- Set [`cucumber.js`](cucumber.js) for profiling

- Set [`package.json`](package.json) for command: `yarn test`
