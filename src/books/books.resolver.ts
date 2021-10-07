import {
  Args,
  ID,
  Parent,
  ResolveField,
  Resolver,
  ResolveReference,
  Query,
} from '@nestjs/graphql';

import {BooksService} from './books.service';
import {BookConnectionEntity, BookEdgeEntity, BookEntity} from './books.entity';
import {BookWritingsArgs} from './dto/writings.dto';
import {FindBookArgs, FindBookPayload} from './dto/find-author.dto';
import {ManyBooksArgs} from './dto/many-books.dto';

import {WritingConnectionEntity} from '~/writings/writings.entity';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.books.getById(reference.id);
  }

  @ResolveField(() => WritingConnectionEntity, {name: 'writings'})
  resolveWritings(
    @Parent() {id}: {id: string},
    @Args()
    {orderBy, ...pagination}: BookWritingsArgs,
  ) {
    return this.books.getWritings(
      id,
      pagination,
      this.books.convertWritingsOrderBy(orderBy),
    );
  }

  @Query(() => BookEntity, {name: 'book'})
  async getBook(@Args('id', {type: () => ID}) id: string): Promise<BookEntity> {
    return this.books.getById(id);
  }

  @Query(() => FindBookPayload, {name: 'findBook'})
  async findBook(
    @Args({type: () => FindBookArgs}) {id}: FindBookArgs,
  ): Promise<FindBookPayload> {
    const result = await this.books.findById({id});
    return {author: result};
  }

  @Query(() => BookConnectionEntity, {name: 'manyBooks'})
  async manyBooks(
    @Args({type: () => ManyBooksArgs})
    {orderBy, ...pagination}: ManyBooksArgs,
  ): Promise<BookConnectionEntity> {
    return this.books.getMany(pagination, this.books.convertOrderBy(orderBy));
  }
}

@Resolver(() => BookEdgeEntity)
export class BookEdgesResolver {
  constructor(private readonly service: BooksService) {}

  @ResolveField((type) => BookEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: BookEdgeEntity): Promise<BookEntity> {
    return this.service.getById(node.id);
  }
}
