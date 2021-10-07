import {Module} from '@nestjs/common';

import {WritingsModule} from './writings.module';
import {WritingEdgesResolver} from './writings.resolver';

@Module({
  imports: [WritingsModule],
  providers: [WritingEdgesResolver],
})
export class WritingsResolverModule {}
