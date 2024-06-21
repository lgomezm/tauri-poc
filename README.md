# Tauri POC

This is a POC to create a basic installer. It basically copies bundled files to a path, selected by the user.

## Project setup:

After cloning the repo, cd to the project's root directory and run `npm install`.

It should install all dependencies and you should be ready to run it.

## Project structure:

- `src`: Contains the front-end project, which is a basic React app.
- `src-tauri`: Contains the back-end project, which is a Rust project. It handles copying the files to the path that was provided by the user.

## How to run

`npm run tauri dev`
