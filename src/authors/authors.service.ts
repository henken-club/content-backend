import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';
import {Injectable} from '@nestjs/common';

import {PrismaService} from '~/prisma/prisma.service';
import {
  AuthorWritingsOrder,
  AuthorWritingsOrderField,
  OrderDirection,
} from '~/types/graphql';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrderBy({
    field,
    direction,
  }: AuthorWritingsOrder): [{author: {name: 'asc' | 'desc'}}] {
    switch (field) {
      case AuthorWritingsOrderField.BOOK_TITLE:
        return [
          {author: {name: direction === OrderDirection.ASC ? 'asc' : 'desc'}},
        ];
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getWritings(
    id: string,
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<AuthorsService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.writing.findMany({
          ...args,
          where: {authorId: id},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.writing.count({
          where: {authorId: id},
        }),
      pagination,
    );
  }
}
