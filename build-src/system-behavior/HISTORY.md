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

2. Auto setting node environment from `.nvmrc`

   ```bash
   # Open the shell control file
   vi ~/.zshrc
   ```

   Append below script after `nvm` part.

   ```bash
   # Ref. https://readforlearn.com/how-to-write-a-nvmrc-file-which-automatically-change-node-version/
   autoload -U add-zsh-hook
   load-nvmrc() {
     local node_version="$(nvm version)"
     local nvmrc_path="$(nvm_find_nvmrc)"

     if [ -n "$nvmrc_path" ]; then
       local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

       if [ "$nvmrc_node_version" = "N/A" ]; then
         nvm install
       elif [ "$nvmrc_node_version" != "$node_version" ]; then
         nvm use
      fi
     elif [ "$node_version" != "$(nvm version default)" ]; then
       echo "Reverting to nvm default version"
       nvm use default
    fi
   }
   add-zsh-hook chpwd load-nvmrc
   load-nvmrc
   ```

   Save and quit(`esc` + `:wq`), then reopen your terminal.

3. Install node environment

   ```bash
   # Setup node manager
   nvm install --lts 18

   # Check
   nvm current
   nvm list --no-alias
   node --version

   # Setup package manger
   npm install --global npm   # Maybe need to set tslint.json version. Please check the console
   npm install --global yarn

   # Check
   npm --version
   yarn --version
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
