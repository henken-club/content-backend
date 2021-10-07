import {ArgsType, Field, Int} from '@nestjs/graphql';

import {BookWritingsOrder} from '../books.entity';

import {PaginationArgs} from '~/pagination/pagination.args';

@ArgsType()
export class BookWritingsArgs extends PaginationArgs {
  @Field(() => Int, {nullable: true})
  first!: number | null;

  @Field(() => String, {nullable: true})
  after!: string | null;

  @Field(() => Int, {nullable: true})
  last!: number | null;

  @Field(() => String, {nullable: true})
  before!: string | null;

  @Field(() => BookWritingsOrder)
  orderBy!: BookWritingsOrder;
}
