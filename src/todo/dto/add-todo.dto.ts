import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class AddTodoDto {

  @ApiProperty({
    description: "the title of todo item.",
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  public constructor(opts?: Partial<AddTodoDto>) {
    Object.assign(this, opts);
  }

}