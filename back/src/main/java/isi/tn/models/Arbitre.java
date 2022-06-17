package isi.tn.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(	name = "arbitre", 
uniqueConstraints = { 
	@UniqueConstraint(columnNames = "nomarbitre")
})
public class Arbitre implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="nomArbitre")
	private String nomarbitre;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "nomarbitre" , referencedColumnName = "nomarbitre")
	List<matchkoura> matches = new ArrayList<>();
	private String lastname,nationality,image;
	
	public Arbitre() {
		super();
	}

	public Arbitre(String nma,String ln,String nat,String img) {
		super();
		this.nomarbitre=nma;
		this.lastname=ln;
		this.nationality=nat;
		this.image=img;
	}
	
	public String getNomarbitre() {
		return nomarbitre;
	}

	public void setNomarbitre(String nomarbitre) {
		this.nomarbitre = nomarbitre;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
}
