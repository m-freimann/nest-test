import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  StudentRO,
  CreateStudentDto,
  UpdateStudentDto,
  QueryDto,
} from './students.dto';
import { ApiPaginatedDto, PaginatedDto } from '../dto/paginated.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Rating } from './student.entity';

@ApiTags('students')
@ApiExtraModels(PaginatedDto)
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('/rating')
  @ApiOkResponse({ schema: { enum: [Object.values(Rating)] } })
  getRating(): Rating[] {
    return Object.values(Rating);
  }

  @Get()
  @ApiOperation({ summary: 'Gets students' })
  @ApiPaginatedDto(StudentRO)
  @ApiQuery({ type: QueryDto })
  findAll(@Query() query: QueryDto): Promise<PaginatedDto<StudentRO>> {
    return this.studentsService.findAll({
      ...query,
      limit: query.limit > 100 ? 100 : query.limit,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiCreatedResponse({ type: StudentRO })
  create(@Body() createStudentDto: CreateStudentDto): Promise<StudentRO> {
    return this.studentsService.create(createStudentDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update student' })
  @ApiNoContentResponse({ description: 'Updated' })
  update(
    @Body() updateStudentDto: UpdateStudentDto,
    @Param('id') id: number,
  ): Promise<void> {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete student' })
  @ApiNoContentResponse({ description: 'Deleted' })
  delete(@Param('id') id: number): Promise<void> {
    return this.studentsService.delete(id);
  }
}
