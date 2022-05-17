// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hermes Swap',
  tagline: 'Safe, transparent and fast. A platform at the level of the gods.',
  url: 'https://www.hermesdefi.io/',
  baseUrl: '/Developer-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Hermes-defi', // Usually your GitHub org/user name.
  projectName: 'Developer-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({



      navbar: {
        title: 'Hermes Protocol',
        logo: {
          alt: 'Hermes Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Contracts',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          /*{
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'SDK',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Subgraph (API)',
          },
          {
            href: 'https://github.com/Hermes-defi',
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/hermesdefi',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/CsNtpfFqST',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/hermesdefi',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/channel/UCnLWipB915XYPHMmMZcsnag',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Hermes-defi',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
