package isi.tn.models;

import java.util.Set;

public class add_matches_handler {
	private String tournoiName;
	private Set<matchkoura> matchs;
	
	public add_matches_handler() {}
	
	public String getTournoiName() {
		return tournoiName;
	}
	public void setTournoiName(String tournoiName) {
		this.tournoiName = tournoiName;
	}

	public Set<matchkoura> getMatchs() {
		return matchs;
	}

	public void setMatchs(Set<matchkoura> matchs) {
		this.matchs = matchs;
	}

	
	
}
