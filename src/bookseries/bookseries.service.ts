import {Injectable} from '@nestjs/common';

import {BookSeriesEntity} from './bookseries.entity';

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
}
