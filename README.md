# ALICE

**A**ggregate **L**ine **I**nspector / **C**ollaborative **E**ditor  
A front end tool allowing reviewing and editing of Zooniverse transcription data.

[![Coverage Status](https://coveralls.io/repos/github/zooniverse/text-editor/badge.svg?branch=master)](https://coveralls.io/github/zooniverse/text-editor?branch=master)
![](https://travis-ci.org/zooniverse/text-editor.svg?branch=master)

**Production:** [https://alice.zooniverse.org](https://alice.zooniverse.org)  
**Staging:** [https://alice.preview.zooniverse.org](https://alice.preview.zooniverse.org)

Please refer to the [wiki](https://github.com/zooniverse/text-editor/wiki) for more detailed information.

## Status
This project is currently in beta testing.

## Getting Started
This project uses [Yarn](https://yarnpkg.com/en/docs) or [Docker](https://docs.docker.com/) to get the app up and running

**Yarn**  
- `yarn install` to install package dependencies  
- `yarn test` to run all tests within the repo  
- `yarn storybook` to open a [Storybook](https://storybook.js.org) viewer at `http://localhost:6006` to view components in isolation  
- `yarn start` to open a staging version of the site at `http://localhost:3000` (may need to set up `local.zooniverse.org:3000` to login, [instructions](https://stackoverflow.com/c/zooniverse/questions/109))

**Docker**
- `docker-compose up` to run the development app at `http://localhost:3000` and start storybook at `http://localhost:6006`
- `docker-compose down` to stop the dev containers
- `docker-compose run --rm dev test` to run the tests
