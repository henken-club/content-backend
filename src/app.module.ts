import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {ConfigModule, ConfigType} from '@nestjs/config';

import {AppConfig} from './app.config';
import {BooksResolverModule} from './books/books.resolver.module';
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
    BooksResolverModule,
    WritingsResolverModule,
  ],
})
export class AppModule {}
