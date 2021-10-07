import {Injectable} from '@nestjs/common';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {PrismaService} from '~/prisma/prisma.service';
import {
  BookWritingsOrder,
  BookWritingsOrderField,
  OrderDirection,
} from '~/types/graphql';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  convertOrderBy({
    field,
    direction,
  }: BookWritingsOrder): [{author: {name: 'asc' | 'desc'}}] {
    switch (field) {
      case BookWritingsOrderField.AUTHOR_NAME:
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
    orderBy: ReturnType<BooksService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.writing.findMany({
          ...args,
          where: {bookId: id},
          orderBy,
          select: {id: true},
        }),
      () =>
        this.prisma.writing.count({
          where: {bookId: id},
        }),
      pagination,
    );
  }
}
