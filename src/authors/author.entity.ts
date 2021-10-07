import {
  Field,
  ID,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
  Directive,
} from '@nestjs/graphql';

import {Connection} from '~/pagination/connection.interface';
import {Edge} from '~/pagination/edge.interface';
import {Node} from '~/pagination/node.interface';
import {OrderDirection} from '~/pagination/order.enum';
import {PageInfoEntity} from '~/pagination/page-info.entity';

@ObjectType('Author', {implements: () => [Node]})
@Directive('@key(fields: "id")')
export class AuthorEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  name!: string;
}

@ObjectType('AuthorEdge', {implements: () => [Edge]})
export class AuthorEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('AuthorConnection', {implements: () => [Connection]})
export class AuthorConnectionEntity implements Connection {
  @Field((type) => [AuthorEdgeEntity])
  edges!: AuthorEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}

export enum AuthorWritingsOrderField {
  BOOK_TITLE,
}
registerEnumType(AuthorWritingsOrderField, {
  name: 'AuthorOrderField',
});

@InputType()
export class AuthorWritingsOrder {
  @Field((type) => OrderDirection)
  direction!: OrderDirection;

  @Field((type) => AuthorWritingsOrderField)
  field!: AuthorWritingsOrderField;
}
