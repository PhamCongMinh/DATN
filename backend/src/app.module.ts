import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MODULES } from './modules';
import { ConfigurationModule } from '@config/config.module';
import { DatabaseModule } from '@config/database.module';
import { LoggingModule } from '@shared/modules/loggers/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { ConsoleModule } from 'nestjs-console';
import { AssetUploadModule } from '@modules/asset-upload/asset-upload.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ConsoleModule,
    LoggingModule,
    AssetUploadModule,
    JwtModule.register({}),
    ...MODULES,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
