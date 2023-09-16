export interface IModelsConfig {
  admin: { label: string; prod: string };
  blog: { label: string; prod: string };
  articles: {
    astraia: { label: string; prod: string };
    healthy: { label: string; prod: string };
  };
}

const modelsConfig = {
  admin: {
    label: 'admin',
    prod: 'admin',
  },
  blog: {
    label: 'blog',
    prod: 'blog',
  },
  articles: {
    astraia: {
      label: 'astraia',
      prod: 'prod_astraia_article',
      dev: 'dev_astraia_article',
    },
    healthy: {
      label: 'healthy',
      prod: 'prod_healthy_article',
      dev: 'dev_healthy_article',
    },
  },
};

export default modelsConfig;
