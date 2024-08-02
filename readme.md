# React (Media) Viewer

Trying to native browser tools to display a pdf, video or audio file from a get parameter
It currently works for video and audio.

## Install Instructions (After Cloning Repo)

First, you will need to install Node Version Manager, instructions can be found at [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
After installing Node Version Manager, run this command in terminal:
```
nvm install
```
Second, you will need to install NPM packages, run this command in terminal:
```
npm install
```
Because this is not a production project, run this command in terminal:
```
echo "NODE_ENV=development" > .env
```
To start local development server, run this command in terminal:
```
npm run dev-serve
```
Navigate to localhost:3000 to view page

## How to Use the Viewer
The viewer takes 3 query parameters: `resource`, `type` and `cross-origin`
The `resource` parameter takes a urlencoded copy of the url pointing to the media resource (if it is not urlencoded, you will receive an error)
The `type` parameter takes a urlencoded copy of the expected resource type, for example, `audio/mp3` or `video/mp4` (it must begin with either audio or video, must contain a slash, and must contain a secondary media type)
The `cross-origin` parameter must be either set to `true` or `1` to turn on and `false` or `0` to turn off (it defaults to off if omitted)

## Notes
crossOrigin={isCrossOrigin ? "use-credentials" : "anonymous"}
If `cross-origin` parameter is turned on, it equates to the media element `crossOrigin` attribute to use the value `use-credentials`
If `cross-origin` parameter is turned off, it equates to the media element `crossOrigin` attribute to use the value `anonymous`