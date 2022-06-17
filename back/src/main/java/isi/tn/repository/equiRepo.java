package isi.tn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import isi.tn.models.equipe;


@Repository

public interface equiRepo extends JpaRepository<equipe,String> {

}
