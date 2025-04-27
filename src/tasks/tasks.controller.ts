import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NeedAuth } from '../auth/decorators/need-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('task-lists/:taskListId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @NeedAuth()
  @Post()
  create(@Param('taskListId') taskListId: string, @Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(user, +taskListId, createTaskDto);
  }

  @NeedAuth()
  @Get()
  findAll(@Param('taskListId') taskListId: string, @CurrentUser() user: User) {
    return this.tasksService.findAll(user, +taskListId);
  }

  @NeedAuth()
  @Get(':id')
  findOne(@Param('taskListId') taskListId: string, @Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.findOne(user, +taskListId, +id);
  }

  @NeedAuth()
  @Patch(':id')
  update(@Param('taskListId') taskListId: string, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.update(user, +taskListId, +id, updateTaskDto);
  }

  @NeedAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('taskListId') taskListId: string, @Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.remove(user, +taskListId, +id);
  }
}
