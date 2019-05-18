const defaultConfig = {
  backendUrl: "http://managermaximus.tk:30000/",
};

//// END OF CONFIG DEFAULTS ////

let localConfig = {}
try {
  localConfig = require('./local_config').localConfig;
} catch(error) {}
export const config = Object.assign(defaultConfig, localConfig)

/*

You should make the local_config.js file:

export const localConfig = {
  backendUrl: "http://127.0.0.1:3000/",
};

*/
