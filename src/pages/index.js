import { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Home = () => {
  const context = useDocusaurusContext();
  const { siteConfig } = context;

  useEffect(() => {
    window.location = `${siteConfig.baseUrl}intro`;
  }, [siteConfig]);

  return null;
};

export default Home;
