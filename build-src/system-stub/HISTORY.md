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
+ > No

- ? Where does your code run?
+ > Node

- ? How would you like to define a style for your project?
+ > Use a popular style guide

- ? Which style guide do you want to follow?
+ > Standard: https://github.com/standard/standard

- ? What format do you want your config file to be in?
+ > JavaScript

- ? Would you like to install them now?
+ > Yes

- ? Which package manager do you want to use?
+ > yarn
```

```bash
# Lint
yarn add --dev lint-staged husky
yarn add --dev prettier eslint-plugin-prettier eslint-config-prettier

# Yarn berry with VScode
yarn add --dev @yarnpkg/sdks
yarn dlx @yarnpkg/sdks vscode

# Yarn Contraints plugin
yarn plugin import constraints
# yarn constraints --fix

# Stubbing Framework
yarn add mountebank@2.8.1 ejs@3.1.8
```

> #### [NOTICE]
>
> To safe rendering with EJS,
> must match the **EJS version** with **Mountebank's package.json**
> of [released tag](https://github.com/bbyars/mountebank/tags),
> like [v2.8.1](https://github.com/bbyars/mountebank/blob/908a1eb78af5689c1bd845c4ac8bebea66162e05/package.json#L58)
