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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@ApiBearerAuth('firebase') // swagger security name from swagger.ts
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateTaskDto) {
    return this.tasks.create(req.user.uid, dto);
  }

  @Get()
  list(
    @Req() req: any,
    @Query('status') status?: 'todo' | 'doing' | 'done',
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.tasks.findAll(req.user.uid, { status, page, limit });
  }

  @Get(':id')
  get(@Req() req: any, @Param('id') id: string) {
    return this.tasks.findOne(req.user.uid, id);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasks.update(req.user.uid, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.tasks.remove(req.user.uid, id);
  }
}
