import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Design-to-Code',
    Svg: require('@site/static/img/feature-comprehensive.svg').default,
    description: (
      <>
        Learn how to implement a complete design-to-code workflow that transforms
        your Figma designs into production-ready components with high fidelity.
      </>
    ),
  },
  {
    title: 'AI-Powered Development',
    Svg: require('@site/static/img/feature-ai.svg').default,
    description: (
      <>
        Leverage GitHub Copilot, Azure AI Foundry, and other AI tools to accelerate
        your development process and improve code quality.
      </>
    ),
  },
  {
    title: 'Hands-On Experience',
    Svg: require('@site/static/img/feature-hands-on.svg').default,
    description: (
      <>
        Get practical, hands-on experience with real-world exercises that you can
        apply directly to your own projects and development environments.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
