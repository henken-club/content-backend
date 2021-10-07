import {Parent, ResolveField, Resolver} from '@nestjs/graphql';

import {WritingsService} from './writings.service';

@Resolver('WritingEdge')
export class WritingEdgesResolver {
  constructor(private readonly writings: WritingsService) {}

  @ResolveField('node')
  async resolveNode(@Parent() {node}: {node: {id: string}}) {
    return this.writings.getWriting(node.id);
  }
}
