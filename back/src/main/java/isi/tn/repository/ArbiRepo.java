package isi.tn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import isi.tn.models.Arbitre;


@Repository
public interface ArbiRepo extends JpaRepository<Arbitre,String> {

}