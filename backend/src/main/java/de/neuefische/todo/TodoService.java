package de.neuefische.todo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public void createTodo(String id, Todo todo) {
        todoRepository.save(todo);
    }

    public Collection<Todo> getTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodo(String id) {
        return todoRepository.findById(id).get();
    }

    public void deleteTodo(String id) {
        Optional<Todo> todo = todoRepository.findById(id);
        {
            if (todo.isPresent()) {
                Todo todo1 = todo.get();
                todoRepository.delete(todo1);  // das ist jetzt hier gefährlich, weil wir keinen Test haben, ob überhaupt was drin ist
            }
        }
    }

    public void changeTodo(String id, Todo changedTodo) {
        Optional<Todo> todo = todoRepository.findById(id);
        if (todo.isPresent()) {
            Todo todo1 = todo.get();
            todo1.setTask(changedTodo.getTask());
            todo1.setStatus(changedTodo.getStatus());
            todo1.setDescription(changedTodo.getDescription());
            todoRepository.save(todo1);
        }
    }
}
