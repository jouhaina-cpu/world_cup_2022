package isi.tn.controllers;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import isi.tn.models.*;
import isi.tn.repository.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserRepository userv;
	
	@GetMapping("/user/all")
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> getAllUsers() {
		List<User> pro = userv.findAll();
        return pro;
	    
	}

	@GetMapping("/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public User getUserById(@PathVariable(value = "id") Long Id) {
		return userv.findById(Id).orElseThrow(null);
	}

	@DeleteMapping("/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) {
		User user = userv.findById(userId).orElseThrow(null);
		userv.delete(user);

		return ResponseEntity.ok().build();
	}

	@PutMapping("/user/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public User updateUser(@PathVariable(value = "id") Long Id, @Valid @RequestBody User userDetails) {

	    User user = userv.findById(Id).orElseThrow(null);
	    user.setEmail(userDetails.getEmail());
	    user.setUsername(userDetails.getUsername());
	    user.setFirstName(userDetails.getFirstName());
	    user.setImage(userDetails.getImage());
	    user.setLastName(userDetails.getLastName());
	    User updatedUser = userv.save(user);
	    return updatedUser;
	}
	
	

	@PutMapping("/affecter/{uid}/{pid}")
	@PreAuthorize("hasRole('ADMIN')")
	public void affecterUser(@PathVariable(value = "uid") Long Id,
			@PathVariable(value = "pid") Long Idp) {

	    
	   List<User> list=new ArrayList<>();
		   User user = userv.findById(Id).get();
		   list.add(user);

	}

}
