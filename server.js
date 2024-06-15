/* eslint-disable global-require */
const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');
const protectedRoutes = require('./routes/protectedRoutes');
const { validate } = require('./utils/validate');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    routes: {
        cors: {
          origin: ['*'],
          headers: ['Authorization', 'Content-Type'],
          additionalHeaders: ['cache-control', 'x-requested-with']
        },
    },
  });

  await server.register(require('@hapi/jwt'));

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_SECRET_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    validate,
  });

  server.route(protectedRoutes);
  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
