const withImages = require('next-images');


module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'

  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const flyIoUrl = "https://liconnection-adonis.fly.dev"

  const env = {
    BACKEND_URL: (() => {
      if (isDev) return 'http://localhost:3333'
      if (isProd || isStaging) return flyIoUrl
    })(),

  }


  return {
    default: withImages({
      esModule: true,
      distDir: 'out',
    }),
    env,
  }
}
