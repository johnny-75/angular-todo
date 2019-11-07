import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  title: string;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todo) => {
      this.todos = todo;
    });
  }

  handleDelete(todo: Todo) {
    // Delete from UI
    this.todos = this.todos.filter((t) => t.id !== todo.id);
    // Delete from API
    this.todoService.deleteTodo(todo).subscribe(t => console.log(t));
  }

  addTodo(event) {
    event.target.disabled = true;
    this.todoService.addTodo({title: this.title, completed: false}).subscribe(t => {
      this.todos.push(t);
      event.target.disabled = false;
    });
  }
}
