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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import isi.tn.models.add_matches_handler;
import isi.tn.models.tournois;
import isi.tn.repository.tournoisRepo;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")

public class tournoisController {
	
	@Autowired
	tournoisRepo tournoisV;
	
	@GetMapping("/tournoi/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<tournois> getAllTournois() {
		List<tournois> pro = tournoisV.findAll();
        return pro;
	    
	}
	
	@PostMapping("/tournoi/add")
	@PreAuthorize("hasRole('ADMIN')")
	public tournois createTournoi(@Valid @RequestBody tournois e) {
	    return tournoisV.save(e);
	}
	
	@PostMapping("/tournoi/match")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> addMatchFromTournoi(@Valid @RequestBody add_matches_handler t) {
		tournois eq = tournoisV.findById(t.getTournoiName()).orElseThrow(null);
		eq.getTournois_matchs().addAll(t.getMatchs());
		tournoisV.save(eq);
	    return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/tournoi/match")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteMatchFromTournoi(@RequestParam(value="tournoiName") String tournoiName,@RequestParam(value="matchId") Long matchId) {
		System.out.println(tournoiName+" "+matchId.toString());
		tournois eq = tournoisV.findById(tournoiName).orElseThrow(null);
		eq.getTournois_matchs().removeIf((r) -> (r.getId()==matchId));
		tournoisV.save(eq);
	    return ResponseEntity.ok().build();
	}

	@DeleteMapping("/tournoi/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteTournoi(@PathVariable(value = "id") String tId) {
		tournois eq = tournoisV.findById(tId).orElseThrow(null);
	    tournoisV.delete(eq);
	    return ResponseEntity.ok().build();
	}
	
	@PutMapping("/tournoi/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public tournois updateTournoi(@PathVariable(value = "id") String Id, @Valid @RequestBody tournois tournoiNew) {
		tournois eq = tournoisV.findById(Id).orElseThrow(null);
	    eq.setStatus(tournoiNew.getStatus());
	    eq.setTournoi_title(tournoiNew.getTournoi_title());
	    tournois updatedTournoi = tournoisV.save(eq);
	    return updatedTournoi;
	}

}
