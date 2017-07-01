const nconf = require('nconf')

// Load envs
nconf.env()

// Error: Missing required keys: NODE_ENV 
nconf.required(['NODE_ENV'])

// Set dev values
if(nconf.get('NODE_ENV') === 'TEST')
  // Dev envs
  nconf.defaults({
    'PORT'            : 3000,
    'DB_NAME'         : 'test_dbname',
    'DB_USER'         : 'test_dbuser',
    'DB_PASS'         : 'test_pass',
    'DB_DIALECT'      : 'sqlite',
    'LOG_DIR'         : '/var/log/pokeapi_test',
    'PAGARME_API_KEY' : 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg'
  })
else
  //Default envs
  nconf.defaults({
    'NODE_ENV'        : 'DEV',
    'PORT'            : 3000,
    'DB_NAME'         : 'dev_dbname',
    'DB_USER'         : 'dev_dbuser',
    'DB_PASS'         : 'dev_pass',
    'DB_DIALECT'      : 'sqlite',
    'LOG_DIR'         : '/var/log/pokeapi_dev',
    'PAGARME_API_KEY' : 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg'
  })

const isProd = (conf) => {
  return conf.get('NODE_ENV') === 'PROD'
}

module.exports = nconf
module.exports.isProd = isProd