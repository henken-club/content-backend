import {ArgsType, Field, ID, ObjectType} from '@nestjs/graphql';

import {BookEntity} from '../books.entity';

@ArgsType()
export class FindBookArgs {
  @Field(() => ID)
  id!: string;
}

@ObjectType()
export class FindBookPayload {
  @Field(() => BookEntity, {nullable: true})
  author!: BookEntity | null;
}
