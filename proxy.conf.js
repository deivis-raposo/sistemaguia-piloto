const proxy = [
  {
    context: '/api_piloto',
    target: 'http://18.230.61.76:8080/',
    //target: 'http://localhost:8080/',
    //pathRewrite: { '^/api_piloto': '' },
    secure: false,
    logLevel: 'debug'
  }
];
module.exports = proxy;
