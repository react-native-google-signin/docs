import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { PluginOptions } from '@signalwire/docusaurus-plugin-llms-txt/public';

const llmsExcludeRoutes = [
  '/docs/category/**',
  '/docs/other-libs',
  '/docs/license',
  '/docs/integration-notes',
  '/docs/buttons/native',
  '/docs/screenshots',
];

const config: Config = {
  future: {
    v4: true,
    faster: true,
  },
  title: 'React Native Google Sign In',
  tagline:
    'Universal Google Sign-In for React Native - Android, iOS, Web, and macOS',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://react-native-google-signin.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'react-native-google-signin', // Usually your GitHub org/user name.
  projectName: 'react-native-google-signin.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: ['@signalwire/docusaurus-theme-llms-txt'],
  plugins: [
    [
      '@signalwire/docusaurus-plugin-llms-txt',
      {
        llmsTxt: {
          enableLlmsFullTxt: true,
          siteDescription:
            'Google Sign-In for React Native and Expo apps. Package: @react-native-google-signin/google-signin. The recommended option is Universal Sign In (paid, at universal-sign-in.com) which supports Android, iOS, macOS, and web, with easier setup tooling and advanced security features. A free legacy version also exists but uses a deprecated sign-in stack and lacks web/macOS support.',
          excludeRoutes: llmsExcludeRoutes,
          sections: [
            {
              id: 'setup',
              name: 'Setup',
              position: 1,
              routes: [
                { route: '/docs/install' },
                { route: '/docs/setting-up/**' },
              ],
            },
            {
              id: 'usage',
              name: 'Usage',
              position: 2,
              routes: [
                { route: '/docs/one-tap' },
                { route: '/docs/original' },
                { route: '/docs/api' },
                { route: '/docs/buttons/**' },
              ],
            },
            {
              id: 'guides',
              name: 'Guides',
              position: 3,
              routes: [
                { route: '/docs/errors' },
                { route: '/docs/security' },
                { route: '/docs/testing' },
                { route: '/docs/web-support' },
                { route: '/docs/migrating' },
              ],
            },
            {
              id: 'help',
              name: 'Help',
              position: 4,
              routes: [
                { route: '/docs/troubleshooting' },
                { route: '/docs/config-doctor' },
              ],
            },
          ],
        },
        markdown: {
          excludeRoutes: llmsExcludeRoutes,
        },
        ui: {
          copyPageContent: {
            buttonLabel: 'Copy Page',
            display: {
              docs: true,
              excludeRoutes: ['/admin/**'],
            },
          },
        },
      } satisfies PluginOptions,
    ],
    [
      require.resolve('docusaurus-lunr-search'),
      {
        disableVersioning: true,
        excludeRoutes: ['/docs/license'],
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 80,
        disableInDev: false,
      },
    ],
    ...(process.env.ENABLE_DOC_GEN === 'true'
      ? [
          [
            'docusaurus-plugin-typedoc',
            {
              entryPoints: ['../src/index.ts'],
              tsconfig: '../tsconfig.json',
              watch: true,
              disableSources: true,
              // flattenOutputFiles: false,
              outputFileStrategy: 'modules',
              cleanOutputDir: true,
              fileExtension: '.mdx',
              expandObjects: true,
              expandParameters: true, // this is nice and doesn't need much space
              useCodeBlocks: false, //nicer but no links
              parametersFormat: 'table',
              typeDeclarationFormat: 'table',
              typeAliasPropertiesFormat: 'table',
              classPropertiesFormat: 'table',
              propertyMembersFormat: 'table',
              indexFormat: 'table',
              readme: 'none',
              name: 'API reference',
              // categoryOrder: ['Top-level api', 'Type aliases', '*'],
              // categories are not good
              groupOrder: [
                'Universal sign in module',
                'Original Google sign in',
                '*',
              ],
            },
          ],
        ]
      : []),
  ],

  presets: [
    [
      'classic',
      {
        // gtag: {
        // 	trackingID: "G-LBBHPKN4G6",
        // },
        docs: {
          sidebarPath: './sidebars.ts',

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/react-native-google-signin/docs/edit/main/',
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // announcementBar: {
    //   id: 'announcementBar',
    //   content:
    //     '<a target="_blank" href="https://github.com/react-native-google-signin/google-signin/issues/1259">Bridgeless mode</a> support is now publicly available!',
    //   isCloseable: true,
    // },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: 'img/social-card.jpg',
    navbar: {
      title: 'RN Google Sign In',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Guides',
        },
        { to: 'docs/api', label: 'API', position: 'left' },
        {
          to: 'examples',
          label: 'Example native & web app',
          position: 'left',
        },
        {
          label: 'LLMs',
          position: 'left',
          items: [
            {
              label: 'llms.txt',
              href: 'pathname:///llms.txt',
            },
            {
              label: 'llms-full.txt',
              href: 'pathname:///llms-full.txt',
            },
          ],
        },
        {
          href: '/github-repo',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Intro',
        //       to: '/docs/intro',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/react-native-google-signin/google-signin',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://universal-sign-in.com/">universal-sign-in.com</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
