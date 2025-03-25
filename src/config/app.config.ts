export default () => ({
  app: {
    environment: process.env.APP_ENVIRONMENT,
    port: process.env.APP_PORT,
  },
});
