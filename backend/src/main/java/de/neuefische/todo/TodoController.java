package de.neuefische.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/todos")
@CrossOrigin
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Collection<Todo> createTodo(String id, @RequestBody Todo todo) {
        todoService.createTodo(id, todo);
        return todoService.getTodos();
    }

    @GetMapping
    public Collection<Todo> getTodos() {
        return todoService.getTodos();
    }

    @GetMapping("/api/{id}")
    public Todo getTodo(@PathVariable String id) {
        return todoService.getTodo(id);
    }

    @PutMapping("/api/{id}")
    public Collection<Todo> changeTodo(@PathVariable String id, @RequestBody Todo todo) {
        todoService.changeTodo(id, todo);
        return todoService.getTodos();
    }

    @DeleteMapping("/api/{id}")
    public Collection<Todo> deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
        return todoService.getTodos();
    }

}
