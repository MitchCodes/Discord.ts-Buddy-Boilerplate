# Discord.ts-Buddy-Boilerplate

## Disclaimer

This package is developed for using [TypeScript](http://www.typescriptlang.org/) in Node. Some of the below features may not be very helpful when working in a purely JavaScript environment.

## About

The purpose of this repository is to provide an example and template for using [Discord.ts-Buddy](https://github.com/MitchCodes/Discord.ts-Buddy) to create Discord bots using TypeScript. The purpose of Discord.ts-Buddy itself is to speed up the development time of developing the bots.

## Requirements

>To-do... a sad day indeed.

## Usage

>To-do :(.... I need to push stuff to npm and try using it in another package before I write this out.

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

On build, webpack will take the config.common.json file (if it exists) and merge it with the appropriate dev or prod file (if they exist) depending on whether you built with `npm run build` or `npm run build-prod`. The file that gets generated is named `config.json`. Although this repo comes with [nconf](https://github.com/indexzero/nconf), you can obviously use any configuration library you want. The webpack config file merging will happen anyway.

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