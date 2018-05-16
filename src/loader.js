import Firefox from './data/firefox.yaml';
import Other from './data/other.yaml';
import Support from './data/support.yaml';
import WebDevelopment from './data/webdevelopment.yaml';
import WebPlatform from './data/webplatform.yaml';

const data = {
  ...Firefox,
  ...Other,
  ...Support,
  ...WebPlatform,
  ...WebDevelopment,
};

export default data;
