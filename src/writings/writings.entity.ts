import {Field, ID, Int, ObjectType, Directive} from '@nestjs/graphql';

import {AuthorEntity} from '~/authors/author.entity';
import {BookEntity} from '~/books/books.entity';
import {Connection} from '~/pagination/connection.interface';
import {Edge} from '~/pagination/edge.interface';
import {Node} from '~/pagination/node.interface';
import {PageInfoEntity} from '~/pagination/page-info.entity';

@ObjectType('Writing', {implements: () => [Node]})
@Directive('@key(fields: "id")')
export class WritingEntity implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => AuthorEntity)
  author!: {id: string};

  @Field((type) => BookEntity)
  book!: {id: string};
}

@ObjectType('WritingEdge', {implements: () => [Edge]})
export class WritingEdgeEntity implements Edge {
  @Field((type) => String)
  cursor!: string;

  node!: {id: string};
}

@ObjectType('WritingConnection', {implements: () => [Connection]})
export class WritingConnectionEntity implements Connection {
  @Field((type) => [WritingEdgeEntity])
  edges!: WritingEdgeEntity[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field(() => Int)
  totalCount!: number;
}
