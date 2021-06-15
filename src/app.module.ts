import { Module } from '@nestjs/common';
import { AppController } from './contollers';
import { AppService, UtilsService, OrchestreService } from './services';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        host: 'localhost',
        port: 6379,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService, OrchestreService],
})
export class AppModule {}
