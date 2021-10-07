import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {BooksService} from './books.service';

import {BookWritingsOrder} from '~/types/graphql';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly books: BooksService) {}

  @ResolveField('writings')
  getUser(
    @Parent() {id}: {id: string},
    @Args()
    {
      orderBy,
      ...pagination
    }: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
      orderBy: BookWritingsOrder;
    },
  ) {
    return this.books.getWritings(
      id,
      pagination,
      this.books.convertOrderBy(orderBy),
    );
  }
}
