/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */


const { i18n } = require('./next-i18next.config.js');
const withTranslateRoutes = require('next-translate-routes/plugin')

module.exports = withTranslateRoutes({
  output: 'standalone',
  reactStrictMode: true,
  i18n
});
