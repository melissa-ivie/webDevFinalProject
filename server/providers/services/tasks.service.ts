import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'server/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(relations: string[] = []) {
    return this.tasksRepository.find({ relations });
  }

  find(seekid: number) {
    return this.tasksRepository.findOne({ id: seekid });
  }

  update(newid: number, newstatus:string) {
    return this.tasksRepository.update({ id: newid }, { status: newstatus });
  }

  assign(newid: number, newAssignee:string) {
    return this.tasksRepository.update({ id: newid }, { assignee: newAssignee }); 
  }

  create(newTask: Task) {
    return this.tasksRepository.save(newTask);
  }
}
