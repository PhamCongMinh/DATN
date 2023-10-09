import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES } from './modules';
import { ConfigurationModule } from '@config/config.module';
import { DatabaseModule } from '@config/database.module';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    LoggingModule,
    JwtModule.register({}),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
