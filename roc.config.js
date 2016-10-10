module.exports = {
  settings: {
    runtime: {
      applicationName: 'CappoW',
      port: process.env.PORT || 3000,
      serve: ['public', 'build/client'],
      favicon: 'favicon.png',
    },
    build: {
      reducers: 'src/redux/reducers.js',
      routes: 'src/routes/index.js',
    },
  },
};
