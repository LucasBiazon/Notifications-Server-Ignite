import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';
import { AppController } from './infra/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
