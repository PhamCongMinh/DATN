import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { LoggerService } from '@shared/modules/loggers/logger.service';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from '@modules/course/course.service';
import { CreateCourseDto } from '@modules/course/dto/create-course.dto';
import { CreateSectionDto } from '@modules/course/dto/create-section.dto';
import { CreateLessonDto } from '@modules/course/dto/create-lesson.dto';
import { UseAuth } from '@shared/decorators/auth.decorator';
import { EUserRole } from '@models/entities';
import { GetSectionInACourseDto } from '@modules/course/dto/get-section-in-a course.dto';
import { GetMyCourseDto } from '@modules/course/dto/get-my-course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private loggerService: LoggerService,
  ) {
    this.loggerService.getLogger('CourseController');
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/')
  async createCourse(@Req() req, @Body() data: CreateCourseDto) {
    return this.courseService.createCourse(req.user._id, data);
  }

  @Get('/')
  async getCourse(@Query() getMyCourseDto: GetMyCourseDto) {
    return this.courseService.getCourse(getMyCourseDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/my-course')
  async getCourseByAuthor(@Req() req, @Query() getMyCourseDto: GetMyCourseDto) {
    return this.courseService.getCourseByAuthor(req.user._id, getMyCourseDto);
  }

  @Post('/section')
  @UseAuth(Object.values(EUserRole))
  async createSection(@Body() data: CreateSectionDto) {
    return this.courseService.createSection(data);
  }

  @Get('/section')
  @UseAuth(Object.values(EUserRole))
  async getContentInACourse(@Query() data: GetSectionInACourseDto) {
    return this.courseService.getContentInACourse(data.course_id);
  }

  @Delete('section/:id')
  @UseAuth(Object.values(EUserRole))
  async deleteSection(@Param('id') section_id: string) {
    return this.courseService.deleteSection(section_id);
  }

  @Put('section/:id')
  @UseAuth(Object.values(EUserRole))
  async updateSection(
    @Param('id') section_id: string,
    @Body() data: CreateSectionDto,
  ) {
    return this.courseService.updateSection(section_id, data);
  }

  @Post('/lesson')
  @UseAuth(Object.values(EUserRole))
  async createLesson(@Body() data: CreateLessonDto) {
    return this.courseService.createLesson(data);
  }

  @Put('/lesson/:id')
  @UseAuth(Object.values(EUserRole))
  async editLesson(@Param('id') id: string, @Body() data: CreateLessonDto) {
    return this.courseService.editLesson(id, data);
  }

  @Get('/lesson/:id')
  @UseAuth(Object.values(EUserRole))
  async getLessonById(@Param('id') lesson_id: string) {
    return this.courseService.getLessonById(lesson_id);
  }

  @Delete('/lesson/:id')
  @UseAuth(Object.values(EUserRole))
  async deleteLesson(@Param('id') lesson_id: string) {
    return this.courseService.deleteLesson(lesson_id);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/:id/participants')
  async getListStudentInCourse(@Req() req, @Param('id') id: string) {
    return this.courseService.getListStudentInCourse(req.user._id, id);
  }

  @UseAuth(Object.values(EUserRole))
  @Post('/:id/join')
  async joinCourse(@Req() req, @Param('id') id: string) {
    return this.courseService.joinCourse(req.user._id, id);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/joined')
  async getJoinedCourse(@Req() req, @Query() getMyCourseDto: GetMyCourseDto) {
    return this.courseService.getJoinedCourse(req.user._id, getMyCourseDto);
  }

  @UseAuth(Object.values(EUserRole))
  @Get('/:id/check-joined')
  async checkJoinedCourse(@Req() req, @Param('id') id: string) {
    return this.courseService.checkJoinedCourse(req.user._id, id);
  }
}
