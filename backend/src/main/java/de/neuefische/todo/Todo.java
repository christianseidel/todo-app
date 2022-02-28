package de.neuefische.todo;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class Todo {

    public String id = UUID.randomUUID().toString();
    public String task;
    public String description;
    public TodoStatus status = TodoStatus.Open;

    public Todo(String id, String task) {
        this.id = id;
        this.task = task;
        }
    
}
