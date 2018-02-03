# Anrop Steam API

* Search Steam Workshop
* Fetch info about Steam Workshop Item
* Create HTML Preset for an operation

## Requirements

Code is written in [Node.js](https://nodejs.org/).

## How To Use

Install dependences with `npm install`.

Setup all needed environment variables, see below.

Start the API with `npm start`.

## Environment Variables

Application tries to load environment variables from `.env` file if available

| Key | Required | Description |
| --- | -------- | ----------- |
| PORT | No | Port that HTTP Server is bound to. 3000 by default |
| STEAM_WEB_API_KEY | Yes | Steam Web API key required to search the Workshop |
