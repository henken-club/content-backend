import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {WritingEdgeEntity, WritingEntity} from './writings.entity';
import {WritingsService} from './writings.service';

import {BookEntity} from '~/books/books.entity';
import {AuthorsService} from '~/authors/authors.service';
import {BooksService} from '~/books/books.service';
import {AuthorEntity} from '~/authors/author.entity';

@Resolver(() => WritingEntity)
export class WritingResolver {
  constructor(
    private readonly authors: AuthorsService,
    private readonly books: BooksService,
  ) {}

  @ResolveField(() => AuthorEntity, {name: 'author'})
  async resolveAuthor(
    @Parent() {author}: WritingEntity,
  ): Promise<AuthorEntity> {
    return this.authors.getById(author.id);
  }

  @ResolveField(() => BookEntity, {name: 'book'})
  async resolveBook(@Parent() {book}: WritingEntity): Promise<BookEntity> {
    return this.books.getById(book.id);
  }
}

@Resolver(() => WritingEdgeEntity)
export class WritingEdgesResolver {
  constructor(private readonly writings: WritingsService) {}

  @ResolveField(() => WritingEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: {node: {id: string}}) {
    return this.writings.getWriting(node.id);
  }
}
