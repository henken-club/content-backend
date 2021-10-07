import {Injectable} from '@nestjs/common';

import {PrismaService} from '~/prisma/prisma.service';

@Injectable()
export class WritingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWriting(id: string): Promise<{
    author: {id: string};
    book: {id: string};
  }> {
    return this.prisma.writing.findUnique({
      where: {id},
      select: {author: {select: {id: true}}, book: {select: {id: true}}},
      rejectOnNotFound: true,
    });
  }
}
