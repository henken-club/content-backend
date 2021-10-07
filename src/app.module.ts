import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {ConfigModule, ConfigType} from '@nestjs/config';

import {AppConfig} from './app.config';
import {WritingsResolverModule} from './writings/writings.resolver.module';
import {AuthorsResolverModule} from './authors/authors.resolver.module';

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        ...config.graphql,
      }),
    }),
    AuthorsResolverModule,
    WritingsResolverModule,
  ],
})
export class AppModule {}
