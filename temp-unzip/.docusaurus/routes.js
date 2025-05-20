import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Design-to-Code-Playbook/markdown-page',
    component: ComponentCreator('/Design-to-Code-Playbook/markdown-page', 'e7c'),
    exact: true
  },
  {
    path: '/Design-to-Code-Playbook/docs',
    component: ComponentCreator('/Design-to-Code-Playbook/docs', '030'),
    routes: [
      {
        path: '/Design-to-Code-Playbook/docs',
        component: ComponentCreator('/Design-to-Code-Playbook/docs', 'c25'),
        routes: [
          {
            path: '/Design-to-Code-Playbook/docs',
            component: ComponentCreator('/Design-to-Code-Playbook/docs', '958'),
            routes: [
              {
                path: '/Design-to-Code-Playbook/docs/accessibility_responsiveness',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/accessibility_responsiveness', 'ccf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/ai-tools-integration',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/ai-tools-integration', '584'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/angular_implementation',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/angular_implementation', '83a'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/angular-implementation',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/angular-implementation', '746'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/azure_ai_foundry',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/azure_ai_foundry', '18f'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/azure-ai-foundry',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/azure-ai-foundry', '9db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/component_library',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/component_library', 'ccf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/conclusion_references',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/conclusion_references', 'b7d'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/configurando_ambiente',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/configurando_ambiente', 'ec6'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/figma_mcp_server',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/figma_mcp_server', '15e'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/figma-mcp-server',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/figma-mcp-server', 'f2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/figma-to-code-playbook',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/figma-to-code-playbook', 'e91'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/final_playbook',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/final_playbook', '635'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/framework-implementation',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/framework-implementation', '899'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/getting-started',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/getting-started', '684'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/github_copilot_agent',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/github_copilot_agent', 'ae2'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/github-copilot-agent',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/github-copilot-agent', '467'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/indice',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/indice', '226'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/intro',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/intro', 'cc6'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/introducao',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/introducao', 'bad'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/introduction',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/introduction', '605'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/melhorias_sugeridas',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/melhorias_sugeridas', '6c8'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/preparando_designs_figma',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/preparando_designs_figma', 'fcf'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/preparing_figma_designs',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/preparing_figma_designs', '7cb'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/preparing-figma-designs',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/preparing-figma-designs', '0bf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/react_implementation',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/react_implementation', '73b'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/react-implementation',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/react-implementation', '24a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/setting_up_environment',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/setting_up_environment', 'dbf'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/setting-up-environment',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/setting-up-environment', '776'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/site-structure',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/site-structure', '611'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/site-structure-en',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/site-structure-en', 'cde'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/table_of_contents',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/table_of_contents', 'a1d'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/testing_qa',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/testing_qa', 'b1c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/todo',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/todo', '48d'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-basics/congratulations', '6d4'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-basics/create-a-blog-post', 'd1b'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-basics/create-a-document', '379'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-basics/create-a-page', 'c65'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-basics/deploy-your-site', '2ba'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-basics/markdown-features', '481'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-extras/manage-docs-versions', '0e5'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/tutorial-extras/translate-your-site', '002'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/visual_copilot_cursor',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/visual_copilot_cursor', 'c4b'),
                exact: true
              },
              {
                path: '/Design-to-Code-Playbook/docs/visual-copilot-cursor',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/visual-copilot-cursor', '7df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/workshop-1-hour',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/workshop-1-hour', 'b40'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Design-to-Code-Playbook/docs/workshop-3-hour',
                component: ComponentCreator('/Design-to-Code-Playbook/docs/workshop-3-hour', '410'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/Design-to-Code-Playbook/',
    component: ComponentCreator('/Design-to-Code-Playbook/', '9fb'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
