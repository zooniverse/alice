const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

const baseConfig = {
  development: {
    caesar: 'https://caesar-staging.zooniverse.org/graphql',
    tove: 'https://tove-staging.zooniverse.org'
  },
  production: {
    caesar: 'https://caesar.zooniverse.org/graphql',
    tove: 'https://tove.zooniverse.org'
  }
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
