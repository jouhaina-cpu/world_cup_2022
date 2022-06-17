package isi.tn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.models.tournois;


@Repository
public interface tournoisRepo extends JpaRepository<tournois,String> {

}