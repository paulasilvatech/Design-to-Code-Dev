# 🔄 Workflow Automation with GitHub Actions

This guide provides detailed instructions for setting up automated workflows with GitHub Actions to streamline your design-to-code process.

## Table of Contents
- [GitHub Actions Fundamentals](#github-actions-fundamentals)
- [Setting Up Basic Workflows](#setting-up-basic-workflows)
- [Automating Design-to-Code Workflows](#automating-design-to-code-workflows)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Quality Assurance Workflows](#quality-assurance-workflows)
- [Notification and Communication](#notification-and-communication)
- [Optimizing GitHub Actions](#optimizing-github-actions)
- [Best Practices](#best-practices)

## GitHub Actions Fundamentals

GitHub Actions is a powerful automation platform built directly into GitHub. It allows you to automate your software development workflows from within your repository.

### Key Concepts

1. **Workflows**: YAML files stored in `.github/workflows` directory
2. **Jobs**: A set of steps executed on the same runner
3. **Steps**: Individual tasks that run commands or actions
4. **Actions**: Reusable units of code that can be shared across workflows
5. **Runners**: Servers that run your workflows (GitHub-hosted or self-hosted)
6. **Events**: Triggers that initiate workflows (e.g., push, pull_request)

### Basic Workflow Structure

```yaml
name: Basic Workflow

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
```

### Common GitHub Actions Events

- **push**: Triggered when code is pushed to the repository
- **pull_request**: Triggered when a pull request is opened, updated, or closed
- **workflow_dispatch**: Manually triggered workflow
- **schedule**: Run workflow at scheduled times using cron syntax
- **release**: Triggered when a release is created

## Setting Up Basic Workflows

Let's create some fundamental workflows for your design-to-code project.

### CI Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run unit tests
      run: npm test
    
    - name: Build
      run: npm run build
```

### Storybook Deployment Workflow

```yaml
# .github/workflows/storybook.yml
name: Storybook

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build Storybook
      run: npm run build-storybook
    
    - name: Deploy to GitHub Pages
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: storybook-static
        branch: gh-pages
```

### Release Workflow

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        registry-url: 'https://registry.npmjs.org'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
    - name: Create GitHub Release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: ${{ github.ref }}
        release_name: Release ${{ github.ref }}
        draft: false
        prerelease: false
    
    - name: Publish to npm
      run: npm publish
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Automating Design-to-Code Workflows

Now let's explore workflows specifically designed for the design-to-code process.

### Figma to Code Synchronization

This workflow monitors changes in Figma designs and updates the codebase accordingly:

```yaml
# .github/workflows/figma-sync.yml
name: Figma Sync

on:
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight
  workflow_dispatch:  # Allow manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Fetch Figma design tokens
      run: node scripts/fetch-figma-tokens.js
      env:
        FIGMA_API_KEY: ${{ secrets.FIGMA_API_KEY }}
        FIGMA_FILE_ID: ${{ vars.FIGMA_FILE_ID }}
    
    - name: Update design tokens
      run: node scripts/update-design-tokens.js
    
    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        commit-message: 'chore: update design tokens from Figma'
        title: 'Update design tokens from Figma'
        body: |
          This PR updates design tokens based on the latest Figma designs.
          
          - Updated on: ${{ steps.date.outputs.date }}
          - Figma file: ${{ vars.FIGMA_FILE_ID }}
        branch: figma-tokens-update
```

Here's an example script for fetching Figma design tokens:

```javascript
// scripts/fetch-figma-tokens.js
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;

async function fetchFigmaFile() {
  const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`, {
    headers: {
      'X-Figma-Token': FIGMA_API_KEY
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch Figma file: ${response.statusText}`);
  }
  
  return response.json();
}

async function extractDesignTokens(figmaData) {
  // This is a simplified example - in a real application you would
  // create a more sophisticated parser for your specific Figma structure
  const tokens = {
    colors: {},
    typography: {},
    spacing: {}
  };
  
  // Example: Extract colors from Figma styles
  if (figmaData.styles) {
    Object.entries(figmaData.styles).forEach(([id, style]) => {
      if (style.styleType === 'FILL') {
        // Find the node with this style ID
        // This is a simplified example - you would need to traverse the Figma tree
        const node = findNodeWithStyleId(figmaData.document, id);
        if (node && node.fills && node.fills.length > 0) {
          const fill = node.fills[0];
          if (fill.type === 'SOLID') {
            const { r, g, b } = fill.color;
            tokens.colors[style.name] = rgbToHex(r, g, b);
          }
        }
      }
    });
  }
  
  // Similar extraction for typography, spacing, etc.
  
  return tokens;
}

function findNodeWithStyleId(node, styleId) {
  // Recursively find a node with the given style ID
  // This is a simplified example
  if (node.styles && node.styles.fill === styleId) {
    return node;
  }
  
  if (node.children) {
    for (const child of node.children) {
      const result = findNodeWithStyleId(child, styleId);
      if (result) return result;
    }
  }
  
  return null;
}

function rgbToHex(r, g, b) {
  // Convert RGB values (0-1) to hex color code
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

async function main() {
  try {
    console.log('Fetching Figma file...');
    const figmaData = await fetchFigmaFile();
    
    console.log('Extracting design tokens...');
    const tokens = await extractDesignTokens(figmaData);
    
    // Save tokens to a JSON file
    const outputPath = path.resolve(__dirname, '../src/tokens/figma-tokens.json');
    fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));
    
    console.log(`Design tokens saved to ${outputPath}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
```

### Visual Regression Testing with Chromatic

```yaml
# .github/workflows/visual-testing.yml
name: Visual Testing

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Publish to Chromatic
      uses: chromaui/action@v1
      with:
        projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
        token: ${{ secrets.GITHUB_TOKEN }}
```

### Design System Documentation Generation

```yaml
# .github/workflows/docs.yml
name: Design System Docs

on:
  push:
    branches: [ main ]
    paths:
      - 'src/components/**'
      - 'docs/**'
  workflow_dispatch:

jobs:
  build-docs:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Generate component documentation
      run: npm run generate-docs
    
    - name: Build documentation site
      run: npm run build-docs
    
    - name: Deploy to GitHub Pages
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: docs-build
        branch: gh-pages
```

## Continuous Integration and Deployment

Let's set up comprehensive CI/CD workflows for your design-to-code projects.

### Matrix Testing

Test across multiple Node.js versions and operating systems:

```yaml
# .github/workflows/matrix-testing.yml
name: Matrix Testing

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14.x, 16.x, 18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
```

### Continuous Deployment to Multiple Environments

```yaml
# .github/workflows/deployment.yml
name: Deployment

on:
  push:
    branches:
      - main
      - 'releases/**'
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - development
          - staging
          - production

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    environment:
      name: ${{ github.event.inputs.environment || (github.ref == 'refs/heads/main' && 'staging' || 'development') }}
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
      env:
        NODE_ENV: ${{ github.event.inputs.environment || (github.ref == 'refs/heads/main' && 'staging' || 'development') }}
    
    - name: Deploy to AWS S3
      uses: jakejarvis/s3-sync-action@master
      with:
        args: --delete
      env:
        AWS_S3_BUCKET: ${{ secrets[format('S3_BUCKET_{0}', github.event.inputs.environment || (github.ref == 'refs/heads/main' && 'STAGING' || 'DEVELOPMENT'))] }}
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        SOURCE_DIR: 'build'
    
    - name: Invalidate CloudFront
      if: ${{ github.event.inputs.environment == 'production' || github.ref == 'refs/heads/main' }}
      uses: chetan/invalidate-cloudfront-action@master
      env:
        DISTRIBUTION: ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }}
        PATHS: '/*'
        AWS_REGION: 'us-east-1'
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Quality Assurance Workflows

### Code Quality Checks

```yaml
# .github/workflows/code-quality.yml
name: Code Quality

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: ESLint
      run: npm run lint
    
    - name: Prettier
      run: npm run format:check
    
    - name: TypeScript
      run: npm run type-check
    
    - name: Run unit tests with coverage
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        token: ${{ secrets.CODECOV_TOKEN }}
        files: ./coverage/lcov.info
        flags: unittests
        fail_ci_if_error: true
```

### Accessibility Audits

```yaml
# .github/workflows/accessibility.yml
name: Accessibility

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  a11y:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build Storybook
      run: npm run build-storybook
    
    - name: Start Storybook server
      run: npx http-server storybook-static -p 6006 &
    
    - name: Wait for server
      run: npx wait-on http://localhost:6006
    
    - name: Run accessibility tests
      run: npm run test:a11y
      
    - name: Run Lighthouse CI
      uses: treosh/lighthouse-ci-action@v9
      with:
        urls: |
          http://localhost:6006/
        uploadArtifacts: true
        temporaryPublicStorage: true
```

### Bundle Size Monitoring

```yaml
# .github/workflows/bundle-size.yml
name: Bundle Size

on:
  pull_request:
    branches: [ main ]

jobs:
  size:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Report bundle size
      uses: siddharthkp/bundlesize@main
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Notification and Communication

### Slack Notifications

```yaml
# .github/workflows/notify.yml
name: Notifications

on:
  workflow_run:
    workflows: ["CI", "Deployment"]
    types:
      - completed

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
    - name: Send Slack notification
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ github.event.workflow_run.conclusion }}
        fields: repo,message,commit,author,action,workflow
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### PR Feedback and Commenting

```yaml
# .github/workflows/pr-feedback.yml
name: PR Feedback

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  feedback:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      id: lint
      run: npm run lint:report || echo "::set-output name=fail::true"
      continue-on-error: true
    
    - name: Comment on PR with linting feedback
      if: steps.lint.outputs.fail == 'true'
      uses: actions/github-script@v6
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        script: |
          const fs = require('fs');
          const lintResults = JSON.parse(fs.readFileSync('lint-results.json', 'utf8'));
          
          let comment = '## Linting Issues\n\n';
          
          lintResults.forEach(result => {
            comment += `### ${result.filePath}\n`;
            result.messages.forEach(msg => {
              comment += `- Line ${msg.line}: ${msg.message} (${msg.ruleId})\n`;
            });
            comment += '\n';
          });
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: comment
          });
```

## Optimizing GitHub Actions

### Caching Dependencies

```yaml
# .github/workflows/cached-ci.yml
name: Cached CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Cache node modules
      uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-
    
    - name: Install dependencies
      run: npm ci
    
    - name: Cache build
      uses: actions/cache@v3
      with:
        path: |
          .next
          out
          build
          storybook-static
        key: ${{ runner.os }}-build-${{ github.sha }}
        restore-keys: |
          ${{ runner.os }}-build-
    
    - name: Build
      run: npm run build
```

### Self-Hosted Runners

For projects requiring specific hardware or software not available on GitHub-hosted runners:

```yaml
# .github/workflows/self-hosted.yml
name: Self-Hosted CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: self-hosted
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

### Scheduled Dependency Updates

```yaml
# .github/workflows/dependencies.yml
name: Update Dependencies

on:
  schedule:
    - cron: '0 0 * * 1'  # Run every Monday at midnight
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
    
    - name: Update dependencies
      run: npx npm-check-updates -u
    
    - name: Install dependencies
      run: npm install
    
    - name: Run tests
      run: npm test
    
    - name: Create Pull Request
      uses: peter-evans/create-pull-request@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        commit-message: 'chore: update dependencies'
        title: 'Update dependencies'
        body: 'Automated dependency update using npm-check-updates'
        branch: 'dependency-update'
```

## Best Practices

### Security and Secrets Management

1. **Store Sensitive Data in Secrets**:
   - Never hardcode API keys, passwords, or tokens
   - Use GitHub repository secrets for sensitive values
   - Reference secrets in workflows using `${{ secrets.SECRET_NAME }}`

2. **Limit Permissions**:
   - Use the principle of least privilege
   - Restrict what workflows can do with the `permissions` key:

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write
```

3. **Scan for Secrets**:
   - Use secret scanning tools to prevent accidental leaks
   - Add a secret scanning workflow:

```yaml
# .github/workflows/secret-scanning.yml
name: Secret Scanning

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Scan for secrets
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Workflow Optimization

1. **Minimize Build Times**:
   - Cache dependencies and build artifacts
   - Use efficient Docker images
   - Parallelize jobs when possible

2. **Use Reusable Workflows**:
   - Extract common tasks into reusable workflows
   - Reference them in other workflows:

```yaml
# .github/workflows/reusable-build.yml
name: Reusable Build

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: '16'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ inputs.node-version }}
    - name: Install dependencies
      run: npm ci
    - name: Build
      run: npm run build

# Usage in another workflow:
# jobs:
#   call-build:
#     uses: ./.github/workflows/reusable-build.yml
#     with:
#       node-version: '18'
```

3. **Monitor Workflow Performance**:
   - Regularly review workflow execution times
   - Identify bottlenecks and optimize slow steps
   - Consider upgrading to faster GitHub-hosted runners

### Documentation and Maintenance

1. **Comment Workflows**:
   - Add comments to complex workflows explaining their purpose
   - Document environment variables and secrets required

2. **Create Workflow Status Badges**:
   - Add workflow status badges to your README.md:
   ```markdown
   ![CI](https://github.com/username/repo/actions/workflows/ci.yml/badge.svg)
   ![Deployment](https://github.com/username/repo/actions/workflows/deployment.yml/badge.svg)
   ```

3. **Schedule Regular Reviews**:
   - Periodically review and update your workflows
   - Remove unused workflows and steps
   - Update actions to the latest versions

## 💡 Try It Yourself

1. Create a basic CI workflow for your design-to-code project
2. Set up a Storybook deployment workflow
3. Implement visual regression testing with Chromatic
4. Create a notification workflow for Slack or Discord
5. Add code quality checks and accessibility testing
6. Set up automated dependency updates
7. Add status badges to your README.md

## 🔜 Next Steps

Now that you've learned how to automate your workflows with GitHub Actions, let's explore hands-on workshop guides to practice and apply these concepts. Continue to the [Workshop Guides: Hands-on Practice](../10-workshops/README.md) guide. 