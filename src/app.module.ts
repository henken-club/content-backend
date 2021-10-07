import {Module} from '@nestjs/common';
import {GraphQLFederationModule} from '@nestjs/graphql';
import {ConfigModule, ConfigType} from '@nestjs/config';

import {AppConfig} from './app.config';
import {WritingsResolverModule} from './writings/writings.resolver.module';
import {AuthorsResolverModule} from './authors/authors.resolver.module';
import {BooksResolverModule} from './books/books.resolver.module';
import {BookSeriesResolverModule} from './bookseries/bookseries.resolver.module';

@Module({
  imports: [
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule.forFeature(AppConfig)],
      inject: [AppConfig.KEY],
      useFactory: (config: ConfigType<typeof AppConfig>) => ({
        ...config.graphql,
      }),
    }),
    BooksResolverModule,
    BookSeriesResolverModule,
    AuthorsResolverModule,
    WritingsResolverModule,
  ],
})
export class AppModule {}
