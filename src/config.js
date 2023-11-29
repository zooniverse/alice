const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromCRA = process.env.REACT_APP_ENV
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromCRA || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development|test)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

export const ASM_COLLABORATIVE_ID = '5339'
export const ASM_INDIVIDUAL_ID = '5329'

const baseConfig = {
  development: {
    caesar: 'https://caesar-staging.zooniverse.org/graphql',
    tove: 'https://tove-staging.zooniverse.org'
  },
  production: {
    caesar: 'https://caesar.zooniverse.org/graphql',
    tove: 'https://tove.zooniverse.org'
  },
  test: {
    caesar: 'https://caesar-staging.zooniverse.org/graphql',
    tove: 'https://tove-staging.zooniverse.org'
  },
};

const config = baseConfig[env];
export { config }

function locationMatch(regex) {
  var match;
  const { location } = window
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}
