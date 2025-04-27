import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { NeedAuth } from '../auth/decorators/need-auth.decorator';

@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @NeedAuth()
  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto, @CurrentUser() user: User) {
    return this.taskListsService.create(user, createTaskListDto);
  }

  @NeedAuth()
  @Get()
  findAll(@CurrentUser() user: User) {
    return this.taskListsService.findAll(user);
  }

  @NeedAuth()
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.taskListsService.findOne(user, +id);
  }

  @NeedAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskListDto: UpdateTaskListDto, @CurrentUser() user: User) {
    return this.taskListsService.update(user, +id, updateTaskListDto);
  }

  @NeedAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    await this.taskListsService.remove(user, +id);
  }
}
