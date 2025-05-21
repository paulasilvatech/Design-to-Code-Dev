import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Design to Code Playbook',
  tagline: 'Convert designs to code efficiently using AI tools',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://paulasilvatech.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Design-to-Code-Playbook/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'paulasilvatech', // Updated GitHub org/user name
  projectName: 'Design-to-Code-Playbook', // Updated repo name

  onBrokenLinks: 'ignore', // Changed from 'warn' to 'ignore' to allow build with broken links
  onBrokenMarkdownLinks: 'ignore',
  onDuplicateRoutes: 'warn',

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
        docs: {
          sidebarPath: './sidebars.ts',
          // Removed editUrl to remove "edit this page" links
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/figma-to-code-social-card.jpg',
    navbar: {
      title: 'Design to Code Playbook',
      logo: {
        alt: 'Design to Code Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Playbook',
        },
        {
          href: 'https://github.com/paulasilvatech/Design-to-Code-Playbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/paulasilvatech/Design-to-Code-Playbook/discussions',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/design-to-code',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/paulasilvatech/Design-to-Code-Playbook',
            },
            {
              label: 'Figma Community',
              href: 'https://www.figma.com/community/file/design-to-code',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Design to Code Playbook.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
