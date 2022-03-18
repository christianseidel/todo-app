package de.neuefische.todo.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class MongoUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.findByName(username)
                .map(userDocument -> new User(userDocument.getUsername(), userDocument.getPassword(), List.of(new SimpleGrantedAuthority("anything"))))
                .orElseThrow(() -> new UsernameNotFoundException("Sorry, user " + username + " cannot be found."));
    }
}