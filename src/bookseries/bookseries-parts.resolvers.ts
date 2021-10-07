import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {BookSeriesEdgeEntity, BookSeriesEntity} from './bookseries.entity';
import {
  BookSeriesPartEdgeEntity,
  BookSeriesPartEntity,
} from './bookseries-parts.entity';
import {BookSeriesPartsService} from './bookseries-parts.service';
import {BookSeriesService} from './bookseries.service';

import {BooksService} from '~/books/books.service';
import {BookEntity} from '~/books/books.entity';

@Resolver(() => BookSeriesPartEntity)
export class BookSeriesPartsResolver {
  constructor(
    private readonly books: BooksService,
    private readonly series: BookSeriesService,
  ) {}

  @ResolveField(() => BookEntity, {name: 'book'})
  async resolveAuthor(
    @Parent() {book}: BookSeriesPartEntity,
  ): Promise<BookEntity> {
    return this.books.getById(book.id);
  }

  @ResolveField(() => BookSeriesEntity, {name: 'bookSeries'})
  async resolveBook(
    @Parent() {series}: BookSeriesPartEntity,
  ): Promise<BookSeriesEntity> {
    return this.series.getById(series.id);
  }
}

@Resolver(() => BookSeriesPartEdgeEntity)
export class BookSeriesPartEdgesResolver {
  constructor(private readonly service: BookSeriesPartsService) {}

  @ResolveField((type) => BookSeriesEntity, {name: 'node'})
  async resolveNode(
    @Parent() {node}: BookSeriesEdgeEntity,
  ): Promise<BookSeriesPartEntity> {
    return this.service.getById(node.id);
  }
}
