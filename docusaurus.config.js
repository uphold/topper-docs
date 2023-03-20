const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const config = {
  baseUrl: '/',
  favicon: 'images/favicon.ico',
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  organizationName: 'uphold',

  presets: [
    [
      'classic',
      {
        docs: {
          editUrl: 'https://github.com/uphold/topper-backend/projects/docusaurus/',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ],

  projectName: 'topper-backend.github.io',

  tagline: 'Topper backend internal documentation',

  themeConfig: {
    navbar: {
      items: [
        {
          href: 'https://github.com/uphold/topper-backend',
          label: 'GitHub',
          position: 'right'
        }
      ],
      logo: {
        alt: 'Logo',
        src: 'images/logo.svg'
      },
      title: 'Topper Backend'
    },
    prism: {
      darkTheme: darkCodeTheme,
      theme: lightCodeTheme
    }
  },

  title: 'Topper Backend',

  url: 'https://your-docusaurus-test-site.com'
};

module.exports = config;
