import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Explicitly defined sidebar for better organization
  tutorialSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started',
        'preparing-figma-designs',
        'setting-up-environment',
      ],
    },
    {
      type: 'category',
      label: 'AI Tools Integration',
      items: [
        'ai-tools-integration',
        'github-copilot-agent',
        'figma-mcp-server',
        'visual-copilot-cursor',
        'azure-ai-foundry',
      ],
    },
    {
      type: 'category',
      label: 'Framework Implementation',
      items: [
        'framework-implementation',
        'react-implementation',
        'angular-implementation',
        'component_library',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'accessibility_responsiveness',
        'testing_qa',
      ],
    },
    {
      type: 'category',
      label: 'Workshop Guides',
      items: [
        'workshop-1-hour',
        'workshop-3-hour',
      ],
    },
  ],
};

export default sidebars;
