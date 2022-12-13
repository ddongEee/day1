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

4. [JQ](https://stedolan.github.io/jq/): ike sed for JSON data.

    ```bash
    # Install JQ
    # Mac OSX
    brew install jq

    # Linux
    sudo wget \
        https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 \
        -o /usr/local/bin/jq \
        && sudo chmod +x /usr/local/bin/jq

    # Check
    yq --version
    ```

5. [JMESPath](https://jmespath.org/):  a query language for JSON.

    ```bash
    # Install JMESPath CLI
    # Mac OSX
    brew install jmespath/jmespath/jp

    # Linux
    sudo wget \
        https://github.com/jmespath/jp/releases/latest/download/jp-linux-amd64 \
        -O /usr/local/bin/jp \
        && sudo chmod +x /usr/local/bin/jp

    # Check
    jp --version
    ```

    - [**JMESPath Examples**](https://jmespath.org/examples.html)

    - (Option) [JMESPath Terminal](https://github.com/jmespath/jmespath.terminal#getting-started) in [Docker Container](https://hub.docker.com/r/frew/jpterm)

      ```bash
      # Run on docker container
      docker pull frew/jpterm
      docker run -it --rm --user $(id -u) frew/jpterm
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
