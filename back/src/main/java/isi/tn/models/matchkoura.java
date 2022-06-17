package isi.tn.models;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@SuppressWarnings("serial")
@Entity
@Table(name="matchkoura")
public class matchkoura implements Serializable {
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	@Id
	private Long id;
	private String nomarbitre;
	private String matchDate;
	private String resultat;
	private String teamA;
	private String teamB;
	private String imageUrlA;
	private String imageUrlB;
	private String beginningTime;
	private String matchLocation;

	public matchkoura(String nomarbitre, String date, String resultat,String eq1,String eq2,String url1,String url2,String bTime,String loc) {
		super();
		this.nomarbitre = nomarbitre;
		this.matchDate = date;
		this.resultat = resultat;
		this.teamA=eq1;
		this.teamB=eq2;
		this.imageUrlA=url1;
		this.imageUrlB=url2;
		this.beginningTime=bTime;
		this.matchLocation=loc;
	}

	public matchkoura() {
		super();
	}
	
	
	public Long getId() {
		return id;
	}


	public String getBeginningTime() {
		return beginningTime;
	}

	public void setBeginningTime(String beginningTime) {
		this.beginningTime = beginningTime;
	}

	public void setTeamA(String teamA) {
		this.teamA = teamA;
	}

	public void setTeamB(String teamB) {
		this.teamB = teamB;
	}

	public String getMatchLocation() {
		return matchLocation;
	}

	public void setMatchLocation(String matchLocation) {
		this.matchLocation = matchLocation;
	}
	
	public String getNomarbitre() {
		return nomarbitre;
	}

	public String getImageUrlA() {
		return imageUrlA;
	}

	public void setImageUrlA(String imageUrlA) {
		this.imageUrlA = imageUrlA;
	}

	public String getImageUrlB() {
		return imageUrlB;
	}

	public void setImageUrlB(String imageUrlB) {
		this.imageUrlB = imageUrlB;
	}


	public void setNomarbitre(String nomarbitre) {
		this.nomarbitre = nomarbitre;
	}




	public String getMatchDate() {
		return matchDate;
	}

	public void setMatchDate(String matchDate) {
		this.matchDate = matchDate;
	}

	public String getTeamA() {
		return teamA;
	}

	public String getTeamB() {
		return teamB;
	}

	public String getResultat() {
		return resultat;
	}



	public void setResultat(String resultat) {
		this.resultat = resultat;
	}
	

}
