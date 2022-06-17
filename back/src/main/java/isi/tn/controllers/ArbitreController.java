package isi.tn.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import isi.tn.models.Arbitre;
import isi.tn.repository.ArbiRepo;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")

public class ArbitreController {
	
	@Autowired
	ArbiRepo arbitres;
	
	@GetMapping("/arbitre/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Arbitre> getAllArbitres() {
		List<Arbitre> pro = arbitres.findAll();
        return pro;
	    
	}
	
	@PostMapping("/arbitre/add")
	@PreAuthorize("hasRole('ADMIN')")
	public Arbitre createArbitre(@Valid @RequestBody Arbitre e) {
	    return arbitres.save(e);
	}

	@DeleteMapping("/arbitre/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteArbitre(@PathVariable(value = "id") String arbitreId) {
		Arbitre eq = arbitres.findById(arbitreId).orElseThrow(null);
	    arbitres.delete(eq);
	    return ResponseEntity.ok().build();
	}
	
	@PutMapping("/arbitre/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Arbitre updateArbitre(@PathVariable(value = "id") String Id, @Valid @RequestBody Arbitre arbitreNew) {
		Arbitre eq = arbitres.findById(Id).orElseThrow(null);
	    eq.setNomarbitre(arbitreNew.getNomarbitre());
	    eq.setImage(arbitreNew.getImage());
	    eq.setLastname(arbitreNew.getLastname());
	    eq.setNationality(arbitreNew.getNationality());
	    Arbitre updatedArbitre = arbitres.save(eq);
	    return updatedArbitre;
	}

}
