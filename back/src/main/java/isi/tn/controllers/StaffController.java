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
import isi.tn.models.Staff;
import isi.tn.repository.StaffRepo;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")

public class StaffController {

	@Autowired
	StaffRepo staffs;
	
	@GetMapping("/staff/all")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Staff> getAllStaffs() {
		List<Staff> pro = staffs.findAll();
        return pro;
	    
	}
	
	@PostMapping("/staff/add")
	@PreAuthorize("hasRole('ADMIN')")
	public Staff creatStaff(@Valid @RequestBody Staff s) {
	    return staffs.save(s);
	}

	@DeleteMapping("/staff/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteStaff(@PathVariable(value = "id") Long userId) {
		Staff staff = staffs.findById(userId).orElseThrow(null);
		staffs.delete(staff);

		return ResponseEntity.ok().build();
	}

	@PutMapping("/staff/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Staff updateStaff(@PathVariable(value = "id") Long Id, @Valid @RequestBody Staff staffDetails) {
	    Staff staff = staffs.findById(Id).orElseThrow(null);
	    staff.setEmail(staffDetails.getEmail());
	    staff.setPhone(staffDetails.getPhone());
	    staff.setFirstName(staffDetails.getFirstName());
	    staff.setImage(staffDetails.getImage());
	    staff.setLastName(staffDetails.getLastName());
	    staff.setEquipe(staffDetails.getEquipe());
	    staff.setRole(staffDetails.getRole());
	    Staff updatedStaff = staffs.save(staff);
	    return updatedStaff;
	}
}
