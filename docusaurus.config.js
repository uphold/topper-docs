const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const lightCodeTheme = require('prism-react-renderer').themes.github;

const config = {
  baseUrl: '/',
  favicon: 'images/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],
  tagline: 'Technical documentation on how to integrate with Topper',
  themeConfig: {
    navbar: {
      logo: {
        alt: 'Logo',
        src: 'images/logo-light.svg',
        srcDark: 'images/logo-dark.svg'
      }
    },
    prism: {
      darkTheme: darkCodeTheme,
      theme: lightCodeTheme
    }
  },
  title: 'Topper - Developer docs',
  url: 'https://docs.topperpay.com'
};

module.exports = config;
