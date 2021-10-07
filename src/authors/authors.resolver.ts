import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {AuthorsService} from './authors.service';

import {AuthorWritingsOrder} from '~/types/graphql';

@Resolver('Author')
export class AuthorsResolver {
  constructor(private readonly authors: AuthorsService) {}

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
      orderBy: AuthorWritingsOrder;
    },
  ) {
    return this.authors.getWritings(
      id,
      pagination,
      this.authors.convertOrderBy(orderBy),
    );
  }
}
