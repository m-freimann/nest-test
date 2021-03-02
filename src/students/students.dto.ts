import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  IsEnum,
  IsNumber,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Rating } from './student.entity';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  patronymic: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Rating)
  rating: Rating;

  @ApiProperty({ type: Date, format: 'date' })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}

export class StudentRO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  patronymic: string | null;
  @ApiProperty()
  rating: Rating;
  @ApiProperty({ type: Date, format: 'date' })
  birthday: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export enum Sort {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum SortBy {
  id = 'id',
  surname = 'surname',
  name = 'name',
  patronymic = 'patronymic',
  rating = 'rating',
  birthday = 'birthday',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export class QueryDto {
  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  @IsInt()
  readonly page?: number = 1;

  @ApiPropertyOptional({ default: 20 })
  @Type(() => Number)
  @IsInt()
  readonly limit?: number = 20;

  @ApiPropertyOptional({
    enum: SortBy,
    default: SortBy.createdAt,
  })
  @IsEnum(SortBy)
  readonly sortBy?: SortBy = SortBy.createdAt;

  @ApiPropertyOptional({
    enum: Sort,
    default: Sort.DESC,
  })
  @IsEnum(Sort)
  readonly sort?: Sort = Sort.DESC;
}
