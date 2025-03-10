import { IsEnum, IsOptional, IsString } from "class-validator"
import { TaskStatus } from "../schemas/task.schema"

export class updateTaskDto {
    @IsString()
    @IsOptional()
    readonly title: string

    @IsString()
    @IsOptional()
    readonly description: string

    @IsEnum(TaskStatus,{message:`please enter correct Status`})
    @IsOptional()
    readonly status: TaskStatus
}