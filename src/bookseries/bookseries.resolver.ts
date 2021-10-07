import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import {BookSeriesService} from './bookseries.service';
import {
  FindBookSeriesArgs,
  FindBookSeriesPayload,
} from './dto/find-bookseries.dto';
import {
  BookSeriesConnectionEntity,
  BookSeriesEdgeEntity,
  BookSeriesEntity,
} from './bookseries.entity';
import {ManyBookSeriesArgs} from './dto/many-bookseries.dto';

@Resolver(() => BookSeriesEntity)
export class BookSeriesResolver {
  constructor(private readonly bookSeries: BookSeriesService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.bookSeries.getById(reference.id);
  }

  @Query(() => BookSeriesEntity, {name: 'bookSeries'})
  async getBookSeries(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<BookSeriesEntity> {
    return this.bookSeries.getById(id);
  }

  @Query(() => FindBookSeriesPayload, {name: 'findBookSeries'})
  async findBookSeries(
    @Args({type: () => FindBookSeriesArgs}) {id}: FindBookSeriesArgs,
  ): Promise<FindBookSeriesPayload> {
    const result = await this.bookSeries.findById({id});
    return {bookSeries: result};
  }

  @Query(() => BookSeriesConnectionEntity, {name: 'manyBookSeries'})
  async manyBookSeries(
    @Args({type: () => ManyBookSeriesArgs})
    {orderBy, ...pagination}: ManyBookSeriesArgs,
  ): Promise<BookSeriesConnectionEntity> {
    return this.bookSeries.getMany(
      pagination,
      this.bookSeries.convertOrderBy(orderBy),
    );
  }
}

@Resolver(() => BookSeriesEdgeEntity)
export class BookSeriesEdgesResolver {
  constructor(private readonly service: BookSeriesService) {}

  @ResolveField((type) => BookSeriesEntity, {name: 'node'})
  async resolveNode(
    @Parent() {node}: BookSeriesEdgeEntity,
  ): Promise<BookSeriesEntity> {
    return this.service.getById(node.id);
  }
}
