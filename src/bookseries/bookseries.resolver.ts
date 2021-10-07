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
import {BookSeriesEdgeEntity, BookSeriesEntity} from './bookseries.entity';

@Resolver(() => BookSeriesEntity)
export class BookSeriesResolver {
  constructor(private readonly authors: BookSeriesService) {}

  @ResolveReference()
  resolveReference(reference: {id: string}) {
    return this.authors.getById(reference.id);
  }

  @Query(() => BookSeriesEntity, {name: 'bookSeries'})
  async getBookSeries(
    @Args('id', {type: () => ID}) id: string,
  ): Promise<BookSeriesEntity> {
    return this.authors.getById(id);
  }

  @Query(() => FindBookSeriesPayload, {name: 'findBookSeries'})
  async findBookSeries(
    @Args({type: () => FindBookSeriesArgs}) {id}: FindBookSeriesArgs,
  ): Promise<FindBookSeriesPayload> {
    const result = await this.authors.findById({id});
    return {bookSeries: result};
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
