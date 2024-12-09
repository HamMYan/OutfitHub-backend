import { Module } from '@nestjs/common';
import { WishService } from './wish.service';

@Module({
  providers: [WishService]
})
export class WishModule {}
