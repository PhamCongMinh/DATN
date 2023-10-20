import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ManageSystemService } from '@modules/manage-system/manage-system.service';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities/User.entity';

@ApiTags('Manage System')
@Controller('manage-system')
export class ManageSystemController {
  constructor(
    private manageSystemService: ManageSystemService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('ManageSystemController');
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/')
  async getSystemInformation() {
    return this.manageSystemService.getSystemInformation();
  }
}
