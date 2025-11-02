import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Rock-solid type safety',
    Svg: require('@site/static/img/features-safety.svg').default,
    description: (
      <>
        No runtime exceptions, no unsafe access. 
        With code generation, you get typed fields access and safe <code>fromJson</code> methods.
      </>
    ),
  },
  {
    title: 'Static type inference',
    Svg: require('@site/static/img/features-idea.svg').default,
    description: (
      <>
        ZodArt automatically infers static Dart types from your schemas.
      </>
    ),
  },
  {
    title: 'Composable schemas',
    Svg: require('@site/static/img/features-package.svg').default,
    description: (
      <>
      Build complex validation logic from smaller, reusable pieces.
      </>
    ),
  },
  {
    title: 'Rich, localized error messages',
    Svg: require('@site/static/img/features-globe.svg').default,
    description: (
      <>
      Deliver user-friendly, developer-friendly, and fully localizable error messages. 
      </>
    ),
  },
  {
    title: 'Seamless integration with existing models',
    Svg: require('@site/static/img/features-plug.svg').default,
    description: (
      <>
      Reuse your existing <code>freezed</code> and other models with ZodArt — no boilerplate needed.
      </>
    ),
  },
  {
    title: 'Batteries included',
    Svg: require('@site/static/img/features-battery.svg').default,
    description: (
      <>
        Wide range of validations and transformations out of the box.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureWrapper}>
          <div className={styles.svgCircleWrapper}>
            <Svg className={styles.featureSvg} role="img" />
          </div>
        </div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
