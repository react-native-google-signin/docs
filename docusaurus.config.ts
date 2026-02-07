import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  future: {
    v4: true,
    experimental_faster: true,
  },
  title: 'React Native Google Sign In',
  tagline: 'Google sign in for Expo and React Native apps',
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
  plugins: [
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
    [
      'docusaurus-plugin-llms',
      {
        ignoreFiles: [
          'other-libs*',
          'original*',
          'screenshots*',
          'screenshots/**',
          'license*',
          'integration-notes*',
          '**/buttons/native*',
        ],
        fullContent: true,
        excludeImports: false,
        removeDuplicateHeadings: true,
        description:
          'Google Sign-In for React Native and Expo apps (Android, iOS, macOS, web). Package: @react-native-google-signin/google-signin',
        rootContent: `## Overview

\`@react-native-google-signin/google-signin\` provides Google authentication for React Native and Expo apps.

There are two modules:
- **Universal Sign In** (recommended, [paid](https://universal-sign-in.com/#pricing)): Cross-platform API using Android Credential Manager and iOS Google Sign-In SDK. Module name: \`GoogleOneTapSignIn\`.
- **Original Google Sign In** (free): Legacy API for Android and iOS only. Module name: \`GoogleSignin\`.

## Quick start

1. Install the package (see Installation)
2. Collect configuration (see Configuration guide)
3. Follow the setup guide for your platform (Expo, Android, iOS, or Web)
4. Use the Universal Sign In API (see Universal sign in)

## Docs`,
        fullRootContent: `## Overview

\`@react-native-google-signin/google-signin\` provides Google authentication for React Native and Expo apps on Android, iOS, macOS, and web.

There are two modules:
- **Universal Sign In** (recommended, [paid](https://universal-sign-in.com/#pricing)): Cross-platform API using Android Credential Manager and iOS Google Sign-In SDK. Module name: \`GoogleOneTapSignIn\`.
- **Original Google Sign In** (free): Legacy API for Android and iOS only. Module name: \`GoogleSignin\`.

Key concepts:
- Call \`configure()\` once before any sign-in calls
- \`webClientId\` is required for configuration (obtain from Google Cloud Console)
- Use \`signIn()\` for returning users, \`createAccount()\` for new users
- Use \`requestAuthorization()\` to request additional OAuth scopes
- Handle errors with \`isErrorWithCode()\` helper`,
        includeOrder: [
          'install*',
          '**/get-config-file*',
          '**/expo*',
          '**/setting-up/android*',
          '**/setting-up/ios*',
          '**/setting-up/web*',
          'one-tap*',
          'web-support*',
          'security*',
          '**/buttons/**',
          'errors*',
          'testing*',
          'troubleshooting*',
          'migrating*',
          'config-doctor*',
          'api/**',
        ],
      },
    ],
    // [
    //   'docusaurus-preset-shiki-twoslash',
    //   {
    //     themes: ['min-light', 'nord'],
    //   },
    // ],
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
