const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const lightCodeTheme = require('prism-react-renderer').themes.github;

const typesenseHost = process.env.TYPESENSE_HOST ?? 'localhost';
const typesensePort = parseInt(process.env.TYPESENSE_PORT, 10) || 8108;
const typesenseProtocol = process.env.TYPESENSE_PROTOCOL ?? 'http';
const isLocalTypesense = (typesenseHost === 'localhost' || typesenseHost === 'host.docker.internal') && typesenseProtocol === 'http';
const typesenseSearchApiKey = process.env.TYPESENSE_SEARCH_API_KEY ?? (isLocalTypesense ? 'local_typesense_admin' : undefined);

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
      },
      items: [
        {
          href: 'https://github.com/uphold/topper-docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        }
      ]
    },
    prism: {
      darkTheme: darkCodeTheme,
      theme: lightCodeTheme,
      additionalLanguages: ['java', "go", "python", "php"]
    },
    typesense: {
      contextualSearch: true,
      typesenseCollectionName: 'topper_docs', // Must match `index_name` in `typesense-docsearch-config.json`.
      typesenseServerConfig: {
        apiKey: typesenseSearchApiKey,
        nodes: [{
          host: typesenseHost,
          port: typesensePort,
          protocol: typesenseProtocol
        }],
      }
    }
  },
  themes: ['docusaurus-theme-search-typesense'],
  title: 'Topper - Developer Docs',
  url: process.env.TOPPER_DOCS_URL ?? 'https://docs.topperpay.com'
};

module.exports = config;
