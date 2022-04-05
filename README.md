# ALICE

**A**ggregate **L**ine **I**nspector / **C**ollaborative **E**ditor  
A front end tool allowing reviewing and editing of Zooniverse transcription data.

[![Coverage Status](https://coveralls.io/repos/github/zooniverse/text-editor/badge.svg?branch=master)](https://coveralls.io/github/zooniverse/text-editor?branch=master)

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
- `yarn start` to open a staging version of the site at `https://localhost:3000`. Use `https://local.zooniverse.org:3000` to log in via the Panoptes API ([instructions](https://stackoverflow.com/c/zooniverse/questions/109).)

**Docker**
- `docker-compose up` to run the development app at `http://localhost:3000` and start storybook at `http://localhost:6006`
- `docker-compose down` to stop the dev containers
- `docker-compose run --rm dev test` to run the tests

## Deployment

Deployment is handled by Github Action. Both staging and production deployment can be run ad hoc in the actions tab as needed if you have the appropriate permissions on the repository.

### Environment Variables

React scripts (aka Create-React-App or CRA) [handles the `NODE_ENV`](https://create-react-app.dev/docs/adding-custom-environment-variables/) for us:

> There is also a built-in environment variable called NODE_ENV. You can read it from process.env.NODE_ENV. When you run npm start, it is always equal to 'development', when you run npm test it is always equal to 'test', and when you run npm run build to make a production bundle, it is always equal to 'production'. You cannot override NODE_ENV manually. This prevents developers from accidentally deploying a slow development build to production.

Because of this, if we want to deploy a staging app that builds like production, but uses the Panoptes API staging server, then we would either have to [eject](https://create-react-app.dev/docs/available-scripts#npm-run-eject) and manually manage the `NODE_ENV` or somehow set to use the staging API by another means. Ejecting is undesirable because its impact would mean we would have to manually configure additional things that CRA handles for us and this would defeat the benefit of using CRA.

Instead, another environment variable, `REACT_APP_ENV` set to `development` is used when doing a staging deployment. The `panoptes-javascript-client` was updated to check for this environment variable in addition to what its already set to do and give preference to it before `NODE_ENV`. This enables us to set the client to use the staging API and not have to manage `NODE_ENV` and eject this app.  

### Staging

On merge to master, a Github Action is triggered to deploy to staging to `https://alice.preview.zooniverse.org`.

### Production

Production deployments are triggered by an update to which commit the `production-release` tag is pointed to. This tag should be updated via chat ops and then a Github Action will run that builds and uploads the files to our cloud provider found at `https://alice.zooniverse.org`.