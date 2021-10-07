import * as path from 'path';

import {registerAs} from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  graphql: {
    playground: !(process.env.NODE_ENV === 'development'),
    debug: !(process.env.NODE_ENV === 'development'),
    introspection: true,
    typePaths: ['./**/*.graphql'],
    definitions: {
      outputAs: 'interface' as const,
      path: path.resolve(process.cwd(), './src/types/graphql.ts'),
    },
  },
}));
