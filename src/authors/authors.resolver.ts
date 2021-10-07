import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import {AuthorsService} from './authors.service';
import {AuthorWritingsArgs} from './dto/writings.dto';
import {FindAuthorArgs, FindAuthorPayload} from './dto/find-author.dto';
import {
  AuthorConnectionEntity,
  AuthorEdgeEntity,
  AuthorEntity,
} from './author.entity';
import {ManyAuthorsArgs} from './dto/many-authors.dto';

import {WritingConnectionEntity} from '~/writings/writings.entity';

@Resolver(() => AuthorEntity)
export class AuthorsResolver {
  constructor(private readonly authors: AuthorsService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.authors.getById(reference.id);
  }

  @Query(() => AuthorEntity, {name: 'author'})
  async getAuthor(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<AuthorEntity> {
    return this.authors.getById(id);
  }

  @Query(() => FindAuthorPayload, {name: 'findAuthor'})
  async findAuthor(
    @Args({type: () => FindAuthorArgs}) {id}: FindAuthorArgs,
  ): Promise<FindAuthorPayload> {
    const result = await this.authors.findById({id});
    return {author: result};
  }

  @ResolveField(() => WritingConnectionEntity, {name: 'writings'})
  getUser(
    @Parent() {id}: AuthorEntity,
    @Args()
    {orderBy, ...pagination}: AuthorWritingsArgs,
  ) {
    return this.authors.getWritings(
      id,
      pagination,
      this.authors.convertWritingOrderBy(orderBy),
    );
  }

  @Query(() => AuthorConnectionEntity, {name: 'manyAuthors'})
  async manyAuthors(
    @Args({type: () => ManyAuthorsArgs})
    {orderBy, ...pagination}: ManyAuthorsArgs,
  ): Promise<AuthorConnectionEntity> {
    return this.authors.getMany(
      pagination,
      this.authors.convertOrderBy(orderBy),
    );
  }
}

@Resolver(() => AuthorEdgeEntity)
export class AuthorEdgesResolver {
  constructor(private readonly service: AuthorsService) {}

  @ResolveField((type) => AuthorEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: AuthorEdgeEntity): Promise<AuthorEntity> {
    return this.service.getById(node.id);
  }
}
