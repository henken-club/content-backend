import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {BookSeriesPartsService} from '~/contents/services/bookseries-parts.service';
import {
  BookSeriesEdgeEntity,
  BookSeriesEntity,
} from '~/contents/entities/bookseries.entities';
import {
  BookSeriesPartEdgeEntity,
  BookSeriesPartEntity,
} from '~/contents/entities/bookseries-parts.entities';

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
