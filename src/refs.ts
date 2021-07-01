import fs from 'fs';
import path from 'path';
import { ICssVarRefs } from './types';

export const getZentThemeRefs: () => ICssVarRefs | null = () => {
  const zentPath = require.resolve('zent');

  if (!zentPath) {
    return null;
  }

  const refsPath = path.resolve(zentPath.replace("/index.js", ""), './theme/css-var-ref.json');

  const data = fs.readFileSync(refsPath, { encoding: 'utf-8' }).toString();

  const refs = JSON.parse(data);

  return refs;
}
 


