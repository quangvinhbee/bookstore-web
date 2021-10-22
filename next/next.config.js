var pjson = require("../package.json");
var config = require("config");
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    seo: {
      title: "N17DCAT078",
      siteName: "ptithcm"
  }
  },
};
