import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


const FeatureList = [
  {
    title: 'The Hermes Swap',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <code>Hermes-swap</code> is the Core of Hermes Dex products.         
      </>
    ),
  },
  {
    title: 'Farms',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       Get a preview of the farming options available on <code>The Hermes Protocol</code>.
      </>
    ),
  },
  {
    title: 'Bonds',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Bonding allows Hermes Protocol to accumulate its own liquidity and start building its investment treasury.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
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

export default function HomepageFeatures() {
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
