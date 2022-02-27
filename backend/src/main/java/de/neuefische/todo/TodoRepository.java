package de.neuefische.todo;

import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class TodoRepository {

    public TodoRepository () {
        todos.put("001", new Todo("01","Einkaufen"));
        todos.put("002", new Todo("02", "Fische füttern"));
        todos.put("003", new Todo("03", "Katze suchen"));
        todos.put("005", new Todo("05", "neue Fische kaufen"));
    }

    private Map<String, Todo> todos = new HashMap<>();

    public void save(Todo todo) {
        todos.put(todo.getId(), todo);
    }

    public Todo findById(String id) {
        return todos.get(id);
    }

    public Collection<Todo> findAll() {
        return todos.values();
    }

    public void delete(String id) {
        todos.remove(id);
    }
}
