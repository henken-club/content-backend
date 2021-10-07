import {ArgsType, Field, Int} from '@nestjs/graphql';

import {AuthorWritingsOrder} from '../author.entity';

import {PaginationArgs} from '~/pagination/pagination.types';

@ArgsType()
export class AuthorWritingsArgs extends PaginationArgs {
  @Field(() => Int, {nullable: true})
  first!: number | null;

  @Field(() => String, {nullable: true})
  after!: string | null;

  @Field(() => Int, {nullable: true})
  last!: number | null;

  @Field(() => String, {nullable: true})
  before!: string | null;

  @Field(() => AuthorWritingsOrder)
  orderBy!: AuthorWritingsOrder;
}
