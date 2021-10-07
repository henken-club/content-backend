import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {WritingEdgeEntity, WritingEntity} from './writings.entity';
import {WritingsService} from './writings.service';

@Resolver(() => WritingEdgeEntity)
export class WritingEdgesResolver {
  constructor(private readonly writings: WritingsService) {}

  @ResolveField(() => WritingEntity, {name: 'node'})
  async resolveNode(@Parent() {node}: {node: {id: string}}) {
    return this.writings.getWriting(node.id);
  }
}
