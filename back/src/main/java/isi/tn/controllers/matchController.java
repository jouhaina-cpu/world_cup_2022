package isi.tn.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import isi.tn.models.matchkoura;
import isi.tn.repository.matchkRepo;

@RestController
/*@CrossOrigin(origins = "http://localhost:4200")*/
@RequestMapping("/api")


public class matchController {

	@Autowired
	matchkRepo matchkv;
	
	@GetMapping("/match/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<matchkoura> getAllUsers() {
		List<matchkoura> pro = matchkv.findAll();
        return pro;
	    
	}
	
	@PostMapping("/match/add")
	@PreAuthorize("hasRole('ADMIN')")
	public matchkoura createquipe(@Valid @RequestBody matchkoura m) {
	    return matchkv.save(m);
	}
	
	@DeleteMapping("/match/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteMatch(@PathVariable(value = "id") Long matchId) {
		matchkoura mk = matchkv.findById(matchId).orElseThrow(null);
	    matchkv.delete(mk);
	    return ResponseEntity.ok().build();
	}
	
	@PutMapping("/match/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public matchkoura updateMatche(@PathVariable(value = "id") Long Id, @Valid @RequestBody matchkoura matchNew) {

		matchkoura mk = matchkv.findById(Id).orElseThrow(null);
	    mk.setMatchDate(matchNew.getMatchDate());
	    mk.setNomarbitre(matchNew.getNomarbitre());
	    mk.setResultat(matchNew.getResultat());
	    mk.setTeamA(matchNew.getTeamA());
	    mk.setTeamB(matchNew.getTeamB());
	    mk.setImageUrlA(matchNew.getImageUrlA());
	    mk.setImageUrlB(matchNew.getImageUrlB());
	    mk.setBeginningTime(matchNew.getBeginningTime());
	    mk.setMatchLocation(matchNew.getMatchLocation());
	    
	    matchkoura updatedMatch = matchkv.save(mk);
	    return updatedMatch;
	}
	

	
}
