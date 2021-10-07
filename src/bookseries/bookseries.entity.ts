import {Field, ID, Int, ObjectType, Directive} from '@nestjs/graphql';

import {
  Connection,
  Edge,
  Node,
  PageInfoEntity,
} from '~/pagination/pagination.types';

@ObjectType('BookSeries', {implements: () => [Node]})
@Directive('@key(fields: "id")')
export class BookSeriesEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  title!: string;
}

@ObjectType('BookSeriesEdge', {implements: () => [Edge]})
export class BookSeriesEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('BookSeriesConnection', {implements: () => [Connection]})
export class BookSeriesConnectionEntity implements Connection {
  @Field((type) => [BookSeriesEdgeEntity])
  edges!: BookSeriesEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}
