import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Todo} from '../../models/todo';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItem: Todo;
  @Output() delete: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  setComplete() {
    // UI changes
    this.todoItem.completed = !this.todoItem.completed;
    // API changes
    this.todoService.setCompleted(this.todoItem).subscribe(todo => console.log(todo));
  }

  handleDelete() {
    this.delete.emit(this.todoItem);
  }
}
