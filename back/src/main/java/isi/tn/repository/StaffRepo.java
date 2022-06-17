package isi.tn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.models.Staff;


@Repository
public interface StaffRepo extends JpaRepository<Staff,Long> {

}