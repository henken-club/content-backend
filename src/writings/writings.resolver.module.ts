import {Module} from '@nestjs/common';

import {WritingsModule} from './writings.module';
import {WritingEdgesResolver, WritingResolver} from './writings.resolver';

import {AuthorsModule} from '~/authors/authors.module';
import {BooksModule} from '~/books/books.module';

@Module({
  imports: [WritingsModule, AuthorsModule, BooksModule],
  providers: [WritingResolver, WritingEdgesResolver],
})
export class WritingsResolverModule {}
