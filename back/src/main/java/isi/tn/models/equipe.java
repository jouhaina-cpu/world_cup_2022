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
@Table(	name = "equipe", 
uniqueConstraints = { 
	@UniqueConstraint(columnNames = "nomequipe")
})
public class equipe implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="nomequipe")
	private String nomequipe;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "teama" , referencedColumnName = "nomequipe")
	List<matchkoura> equipe1 = new ArrayList<>();

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "teamb" , referencedColumnName = "nomequipe")
	List<matchkoura> equipe2 = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "equipe" , referencedColumnName = "nomequipe")
	List<Staff> staff = new ArrayList<>();
	
	
	private String region,image;
	
	public equipe() {
		super();
	}
	
	public equipe(String nomequipe,String reg,String img) {
		super();
		this.nomequipe = nomequipe;
		this.image=img;
		this.region=reg;
	}

	
	public String getNomequipe() {
		return nomequipe;
	}
	public void setNomequipe(String nomequipe) {
		this.nomequipe = nomequipe;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public List<Staff> getStaff() {
		return staff;
	}

	public void setStaff(List<Staff> staff) {
		this.staff = staff;
	}
	

}
