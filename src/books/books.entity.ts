import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';

import {
  Connection,
  Edge,
  Node,
  OrderDirection,
  PageInfoEntity,
} from '~/pagination/pagination.types';

@ObjectType('Book', {implements: () => [Node]})
@Directive('@key(fields: "id")')
export class BookEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  title!: string;
}

@ObjectType('BookEdge', {implements: () => [Edge]})
export class BookEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('BookConnection', {implements: () => [Connection]})
export class BookConnectionEntity implements Connection {
  @Field((type) => [BookEdgeEntity])
  edges!: BookEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum BookWritingsOrderField {
  AUTHOR_NAME,
}
registerEnumType(BookWritingsOrderField, {
  name: 'BookOrderField',
});

@InputType()
export class BookWritingsOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => BookWritingsOrderField)
  field!: BookWritingsOrderField;
}
