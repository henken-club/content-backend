import {Injectable} from '@nestjs/common';
import {findManyCursorConnection} from '@devoxa/prisma-relay-cursor-connection';

import {
  BookSeriesEntity,
  BookSeriesOrder,
  BookSeriesOrderField,
} from './bookseries.entity';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class BookSeriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<BookSeriesEntity> {
    return this.prisma.bookSeries.findUnique({
      where: {id},
      select: {id: true, title: true},
      rejectOnNotFound: true,
    });
  }

  async findById(where: {id: string}): Promise<BookSeriesEntity | null> {
    return this.prisma.bookSeries.findUnique({
      where,
      select: {id: true, title: true},
    });
  }

  convertOrderBy({field, direction}: BookSeriesOrder): [{id: 'asc' | 'desc'}] {
    switch (field) {
      case BookSeriesOrderField.ID:
        return [{id: direction}];
    }
    throw new Error(`Unexpected order field: ${field}`);
  }

  async getMany(
    pagination: {
      first: number | null;
      after: string | null;
      last: number | null;
      before: string | null;
    },
    orderBy: ReturnType<BookSeriesService['convertOrderBy']>,
  ) {
    return findManyCursorConnection(
      (args) =>
        this.prisma.bookSeries.findMany({
          ...args,
          orderBy,
          select: {id: true},
        }),
      () => this.prisma.bookSeries.count({}),
      pagination,
    );
  }
}
