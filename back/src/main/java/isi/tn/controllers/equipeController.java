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
import isi.tn.models.equipe;
import isi.tn.repository.equiRepo;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")

public class equipeController {
	
	@Autowired
	equiRepo equiv;
	
	@GetMapping("/equipe/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<equipe> getAllUsers() {
		List<equipe> pro = equiv.findAll();
        return pro;
	    
	}
	
	@PostMapping("/equipe/add")
	@PreAuthorize("hasRole('ADMIN')")
	public equipe createquipe(@Valid @RequestBody equipe e) {
	    return equiv.save(e);
	}

	@GetMapping("/equipe/name/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public String getEquipeNameById(@PathVariable(value = "id") String Id) {
	    equipe eq= equiv.findById(Id).orElseThrow(null);
	    return eq.getNomequipe();
	}

	@GetMapping("/equipe/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public equipe getEquipeById(@PathVariable(value = "id") String Id) {
	    return equiv.findById(Id).orElseThrow(null);
	}

	@DeleteMapping("/equipe/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteEquipe(@PathVariable(value = "id") String equipeId) {
	    equipe eq = equiv.findById(equipeId).orElseThrow(null);
	    equiv.delete(eq);
	    return ResponseEntity.ok().build();
	}
	
	@PutMapping("/equipe/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public equipe updateEquipe(@PathVariable(value = "id") String Id, @Valid @RequestBody equipe equipeNew) {
	    equipe eq = equiv.findById(Id).orElseThrow(null);
	    eq.setNomequipe(equipeNew.getNomequipe());
	    eq.setImage(equipeNew.getImage());
	    eq.setRegion(equipeNew.getRegion());
	    equipe updatedEquipe = equiv.save(eq);
	    return updatedEquipe;
	}

}
