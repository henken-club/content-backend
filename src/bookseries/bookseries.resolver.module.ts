import {Module} from '@nestjs/common';

import {
  BookSeriesPartEdgesResolver,
  BookSeriesPartsResolver,
} from './bookseries-parts.resolvers';
import {BookSeriesModule} from './bookseries.module';
import {
  BookSeriesEdgesResolver,
  BookSeriesResolver,
} from './bookseries.resolver';
import {BookSeriesPartsModule} from './bookseries-parts.module';

import {BooksModule} from '~/books/books.module';

@Module({
  imports: [BookSeriesModule, BookSeriesPartsModule, BooksModule],
  providers: [
    BookSeriesResolver,
    BookSeriesEdgesResolver,
    BookSeriesPartsResolver,
    BookSeriesPartEdgesResolver,
  ],
})
export class BookSeriesResolverModule {}
