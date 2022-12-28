# CS50 Server

The server that accompanies my CS50 project. I will merge the build folder to submit my assignment, but ideally best kept as separate repositories.

## Usage

`npm run build` builds from Typescript.

## Setup

This project requires some additional setup. The `template.env` file in the src folder needs to be duplicated into a `.env` file. The build step will copy this across, but it may be necessary to run `mkdir build` the first time.
