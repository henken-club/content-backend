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
import {BookEdgeEntity, BookEntity} from './books.entity';
import {BookWritingsArgs} from './dto/writings.dto';
import {FindBookArgs, FindBookPayload} from './dto/find-author.dto';

import {WritingConnectionEntity} from '~/writings/writings.entity';

@Resolver(() => BookEntity)
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.books.getById(reference.id);
  }

  @ResolveField(() => WritingConnectionEntity, {name: 'writings'})
  getUser(
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
  async getAuthor(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<BookEntity> {
    return this.books.getById(id);
  }

  @Query(() => FindBookPayload, {name: 'findBook'})
  async findAuthor(
    @Args({type: () => FindBookArgs}) {id}: FindBookArgs,
  ): Promise<FindBookPayload> {
    const result = await this.books.findById({id});
    return {author: result};
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
