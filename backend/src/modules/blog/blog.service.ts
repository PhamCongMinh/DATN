import { Injectable } from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import BlogRepository from '@models/repositories/Blog.repository';
import { CreateBlogDto } from '@modules/blog/dto/request/createRentalNewsDto';

@Injectable()
export class BlogService {
  constructor(
    private blogRepository: BlogRepository,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('BlogService');
  }

  async getAllBlogs() {
    return this.blogRepository.blogDocumentModel.find();
  }

  async createBlogs(ownerId: string, createBlogDto: CreateBlogDto) {
    const data = { ...createBlogDto, ownerId: ownerId };
    return this.blogRepository.blogDocumentModel.create(data);
  }
}
