import fs from 'fs';
import path from 'path';
import { ICssVarRefs } from './types';

const CSS_VAR_REF_FILE = './theme/css-var-ref.json';

export const getZentThemeRefs: () => ICssVarRefs | null = () => {
  // doesn't in node
  if(!fs || !fs.readFileSync) {
    return null;
  }

  const zentPath = require.resolve('zent');

  // doesn't add zent
  if (!zentPath) {
    return null;
  }

  // zent >= 9.8.1
  try {
    const refsPath = path.resolve(zentPath.replace("/index.js", ""), CSS_VAR_REF_FILE);
    const data = fs.readFileSync(refsPath, { encoding: 'utf-8' }).toString();
    const refs = JSON.parse(data);
    return refs;
  } catch (e) {
    return null;
  }
}
 


