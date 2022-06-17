package isi.tn.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;



@Entity
@Table(name="tournois")
public class tournois implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	private String tournoi_title;
	private String status;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
	@JoinTable(	name = "tournoi_match",
				joinColumns = @JoinColumn(name = "tournois_id",table = "tournois"), 
				inverseJoinColumns = @JoinColumn(name = "match_id",table = "matchkoura"))
	private Set<matchkoura> tournois_matchs = new HashSet<>();

	
	public tournois(String ttl,String stat) {
		super();
		this.tournoi_title=ttl;
		this.status=stat;
	}
	
	public tournois() {
		super();
	}

	public String getTournoi_title() {
		return tournoi_title;
	}

	public void setTournoi_title(String title) {
		this.tournoi_title = title;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Set<matchkoura> getTournois_matchs() {
		return tournois_matchs;
	}

	public void setTournois_matchs(Set<matchkoura> tournois_matchs) {
		this.tournois_matchs = tournois_matchs;
	}
	
	
	
}
