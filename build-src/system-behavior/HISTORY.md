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

```diff
eslint --init

> You can also run this command directly using 'npm init @eslint/config'.

- ? How would you like to use ESLint?
+ > To check syntax, find problems, and enforce code style

- ? What type of modules does your project use?
+ > JavaScript modules (import/export)

- ? Which framework does your project use?
+ > None of these

- ? Does your project use TypeScript?
+ > Yes

- ? Where does your code run?
+ > browser
+ > Node

- ? How would you like to define a style for your project?
+ > Use a popular style guide

- ? Which style guide do you want to follow?
+ > standard-with-typescript: https://github.com/standard/eslint-config-standard-with-typescript

- ? What format do you want your config file to be in?
+ > JSON

- ? Would you like to install them now?
+ > Yes

- ? Which package manager do you want to use?
+ > yarn
```

```bash
# Lint
yarn add --dev lint-staged husky
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier
yarn add --dev install-peerdeps
install-peerdeps --dev eslint-config-standard-with-typescript

# Yarn berry with VScode
yarn add --dev @yarnpkg/sdks
yarn dlx @yarnpkg/sdks vscode

# Yarn Contraints plugin
yarn plugin import constraints
# yarn constraints --fix

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
yarn add --dev loglevel
```

- Set [`tsconfig.json`](tsconfig.json) for typescript

- Set [`cucumber.js`](cucumber.js) for profiling

- Set [`package.json`](package.json) for command: `yarn test`
