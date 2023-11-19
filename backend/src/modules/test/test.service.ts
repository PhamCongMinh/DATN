import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import ConferenceRepository from '@models/repositories/Conference.repository';
import { CreateConferenceDto } from '@modules/test/dto/request/test.dto';

@Injectable()
export class TestService {
  constructor(
    private conferenceRepository: ConferenceRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('TestService');
  }

  async getAllConference() {
    return this.conferenceRepository.conferenceDocumentModel.find();
  }

  async createConference(data: CreateConferenceDto) {
    return this.conferenceRepository.conferenceDocumentModel.create(data);
  }
}
