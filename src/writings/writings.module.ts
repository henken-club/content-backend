import {Module} from '@nestjs/common';

import {WritingsService} from './writings.service';

import {PrismaModule} from '~/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WritingsService],
  exports: [WritingsService],
})
export class WritingsModule {}
