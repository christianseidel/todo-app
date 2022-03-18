package de.neuefische.todo.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class UserDocument {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String password;
    private String name = firstName + " " + lastName;
}
