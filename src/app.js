const expressLoader = require('./loaders/expressLoader')
const mongooseLoader = require('./loaders/mongooseLoader')
const Logger = require('./libs/logger')

const log = new Logger(__filename)

async function initApp() {
  // // logging
  // winstonLoader()

  // Database
  await mongooseLoader()

  // express
  const app = expressLoader()

  // // monitor
  // monitorLoader(app)

  // // swagger
  // swaggerLoader(app)

  // // passport init
  // passportLoader(app)

  // // public Url
  // publicLoader(app)
}

initApp()
  .then(() => {log.debug('Application running...')})
  .catch((error) => log.error('Application is crashed: ' + error))

