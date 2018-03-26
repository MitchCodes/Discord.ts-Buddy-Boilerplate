# Discord.ts-Buddy-Boilerplate

## Disclaimer

This package is developed for using [TypeScript](http://www.typescriptlang.org/) in Node. Some of the below features may not be very helpful when working in a purely JavaScript environment.

## About

The purpose of this repository is to provide an example and template for using [Discord.ts-Buddy](https://github.com/MitchCodes/Discord.ts-Buddy) to create Discord bots using TypeScript. The purpose of Discord.ts-Buddy itself is to speed up the development time of developing the bots.

## Requirements

* Node 6.0.0 or up
* [node-gyp](https://github.com/nodejs/node-gyp) installed to build libraries necessary for production Discord.js
    * Requires Python. See the Python installation instructions from the node-gyp link
* Any other requirements from [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome)

## Usage

```
git clone https://github.com/MitchCodes/Discord.ts-Buddy-Boilerplate.git
cd Discord.ts-Buddy-Boilerplate
yarn (OR) npm install
npm run build
```

After installation and building, the application is ready to run. Running main.js in the build folder (with the build folder as the current working directory) with node will start the program. By default the config file will not have a valid token in it so you will have to provide one.

```
cd build
node main.js
```

## Boilerplate Features

In addition to the features you get from [Discord.ts-Buddy](https://github.com/MitchCodes/Discord.ts-Buddy), here are the features that this repository has for development that I think could be useful as an example:

* Fully-featured package.json with every necessary Discord.js dependency for production.
* All code written in TypeScript.
* Webpack for building the application for deployments
* Optional [configuration file setup](#configuration-file-setup) that works together with webpack when building to development and production.
* Dockerfile _(coming soon!)_ for creating an image to easily spin up a container with the bot.
* Unit tests using Jest

## Configuration File Setup

There are three optional files that you can create in the root folder next to package.json and the like:
* _config.common.json_
    * Necessary to have if you want to have any config file.
* _config.dev.json_
* _config.prod.json_

On build, webpack will take the config.common.json file (if it exists) and merge it with the appropriate dev or prod file (if they exist) depending on whether you built with `npm run build` or `npm run build-prod`. The file that gets generated is named `config.json`. _NOTE:_ It merges arrays by adding them together instead of replacing the entire array. Be careful of this.

Although this repo comes with [nconf](https://github.com/indexzero/nconf), you can obviously use any configuration library you want. The webpack config file merging will happen anyway.

## IDE Notes

This was developed using Visual Studio Code so that is the one that I will talk about although any IDE would work.

### Visual Studio Code

The jest extension is definitely helpful. The launch.json file was tricky to get working with Jest so below there is an example of the one that is working well for me.

#### _launch.json example:_

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/src\\main.ts",
            "outFiles": [
               "${workspaceFolder}/build/**/*.js"
            ],
            "sourceMaps": true
        },
        {
            "name": "Debug Jest Tests",
            "type": "node",
            "request": "launch",
            "port":9222,
            "cwd": "${workspaceRoot}",
            "runtimeArgs": ["--inspect=9222",
                "${workspaceRoot}/node_modules/jest/bin/jest.js",
                "--config",
                "${workspaceRoot}/jest.config.js",
                "--runInBand",
                "--coverage",
                "false",
                "--no-cache"],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "sourceMaps": true,
            "outFiles": [
                "${workspaceFolder}/build/**/*.js",
                "${workspaceFolder}/__tests__/**/*"
            ],
            "env":{
                "NO_WEBPACK_MIDDLEWARE": "false"
            }
        }
    ]
}
```