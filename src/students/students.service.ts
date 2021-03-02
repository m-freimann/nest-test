import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  StudentRO,
  CreateStudentDto,
  UpdateStudentDto,
  QueryDto,
} from './students.dto';
import { PaginatedDto } from '../dto/paginated.dto';

import { Student } from './student.entity';

import { snakeCase } from 'typeorm/util/StringUtils';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async findAll({
    page,
    limit,
    sortBy,
    sort,
  }: QueryDto): Promise<PaginatedDto<StudentRO>> {
    const skippedItems = (page - 1) * limit;
    const totalCount = await this.studentsRepository.count();
    const students = await this.studentsRepository
      .createQueryBuilder()
      .orderBy(snakeCase(sortBy), sort)
      .offset(skippedItems)
      .limit(limit)
      .getMany();

    return {
      totalCount,
      page: page,
      limit: limit,
      data: students,
    };
  }

  async create(studentDto: CreateStudentDto): Promise<StudentRO> {
    const student = this.studentsRepository.create(studentDto);
    return this.studentsRepository.save(student);
  }

  async update(id: number, studentDto: UpdateStudentDto): Promise<void> {
    await this.studentsRepository.update({ id }, studentDto);
  }

  async delete(id: number): Promise<void> {
    const student = await this.studentsRepository.findOne(id);
    if (!student) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.studentsRepository.remove(student);
  }
}
