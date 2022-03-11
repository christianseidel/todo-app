package de.neuefische.todo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "todos")
@Data
@NoArgsConstructor
public class Todo {

@Id
    private String id;
    public String task = "";
    public String description = "";
    public TodoStatus status = TodoStatus.Open;

    public Todo(String id, String task) {
        this.id = id;
        this.task = task;
        }
    
}
