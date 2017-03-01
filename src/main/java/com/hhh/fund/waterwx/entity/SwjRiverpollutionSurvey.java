package com.hhh.fund.waterwx.entity;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;


/**
 * The persistent class for the swj_riverpollution_survey database table.
 * 
 */
@Entity
@Table(name="swj_riverpollution_survey")
@NamedQuery(name="SwjRiverpollutionSurvey.findAll", query="SELECT s FROM SwjRiverpollutionSurvey s")
public class SwjRiverpollutionSurvey implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator="idGenerator")
	@GenericGenerator(name="idGenerator", strategy="uuid")
	private String id;

	private String allRiverNumber;

	private String contacts;

	private int oneCityManagement;

	private int oneEnvironment;

	private int oneFarming;

	private int oneOthers;

	private int oneSubtotal;

	private int outfallNumber;

	private int outfallOthers;

	private int outfallSubtotal;

	private int outfallWaterPurification;

	private int outfallWaterSupplies;

	private int pollutionSourceNumber;

	private String principal;

	@Lob
	private String remarks;

	private int riverNumber;

	private String subject;

	private int twoCityManagement;

	private int twoEnvironment;

	private int twoFarming;

	private int twoOthers;

	private int twoSubtotal;

	public SwjRiverpollutionSurvey() {
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAllRiverNumber() {
		return this.allRiverNumber;
	}

	public void setAllRiverNumber(String allRiverNumber) {
		this.allRiverNumber = allRiverNumber;
	}

	public String getContacts() {
		return this.contacts;
	}

	public void setContacts(String contacts) {
		this.contacts = contacts;
	}

	public int getOneCityManagement() {
		return this.oneCityManagement;
	}

	public void setOneCityManagement(int oneCityManagement) {
		this.oneCityManagement = oneCityManagement;
	}

	public int getOneEnvironment() {
		return this.oneEnvironment;
	}

	public void setOneEnvironment(int oneEnvironment) {
		this.oneEnvironment = oneEnvironment;
	}

	public int getOneFarming() {
		return this.oneFarming;
	}

	public void setOneFarming(int oneFarming) {
		this.oneFarming = oneFarming;
	}

	public int getOneOthers() {
		return this.oneOthers;
	}

	public void setOneOthers(int oneOthers) {
		this.oneOthers = oneOthers;
	}

	public int getOneSubtotal() {
		return this.oneSubtotal;
	}

	public void setOneSubtotal(int oneSubtotal) {
		this.oneSubtotal = oneSubtotal;
	}

	public int getOutfallNumber() {
		return this.outfallNumber;
	}

	public void setOutfallNumber(int outfallNumber) {
		this.outfallNumber = outfallNumber;
	}

	public int getOutfallOthers() {
		return this.outfallOthers;
	}

	public void setOutfallOthers(int outfallOthers) {
		this.outfallOthers = outfallOthers;
	}

	public int getOutfallSubtotal() {
		return this.outfallSubtotal;
	}

	public void setOutfallSubtotal(int outfallSubtotal) {
		this.outfallSubtotal = outfallSubtotal;
	}

	public int getOutfallWaterPurification() {
		return this.outfallWaterPurification;
	}

	public void setOutfallWaterPurification(int outfallWaterPurification) {
		this.outfallWaterPurification = outfallWaterPurification;
	}

	public int getOutfallWaterSupplies() {
		return this.outfallWaterSupplies;
	}

	public void setOutfallWaterSupplies(int outfallWaterSupplies) {
		this.outfallWaterSupplies = outfallWaterSupplies;
	}

	public int getPollutionSourceNumber() {
		return this.pollutionSourceNumber;
	}

	public void setPollutionSourceNumber(int pollutionSourceNumber) {
		this.pollutionSourceNumber = pollutionSourceNumber;
	}

	public String getPrincipal() {
		return this.principal;
	}

	public void setPrincipal(String principal) {
		this.principal = principal;
	}

	public String getRemarks() {
		return this.remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getRiverNumber() {
		return this.riverNumber;
	}

	public void setRiverNumber(int riverNumber) {
		this.riverNumber = riverNumber;
	}

	public String getSubject() {
		return this.subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public int getTwoCityManagement() {
		return this.twoCityManagement;
	}

	public void setTwoCityManagement(int twoCityManagement) {
		this.twoCityManagement = twoCityManagement;
	}

	public int getTwoEnvironment() {
		return this.twoEnvironment;
	}

	public void setTwoEnvironment(int twoEnvironment) {
		this.twoEnvironment = twoEnvironment;
	}

	public int getTwoFarming() {
		return this.twoFarming;
	}

	public void setTwoFarming(int twoFarming) {
		this.twoFarming = twoFarming;
	}

	public int getTwoOthers() {
		return this.twoOthers;
	}

	public void setTwoOthers(int twoOthers) {
		this.twoOthers = twoOthers;
	}

	public int getTwoSubtotal() {
		return this.twoSubtotal;
	}

	public void setTwoSubtotal(int twoSubtotal) {
		this.twoSubtotal = twoSubtotal;
	}

	@Override
	public String toString() {
		return "SwjRiverpollutionSurvey [id=" + id + ", allRiverNumber="
				+ allRiverNumber + ", contacts=" + contacts
				+ ", oneCityManagement=" + oneCityManagement
				+ ", oneEnvironment=" + oneEnvironment + ", oneFarming="
				+ oneFarming + ", oneOthers=" + oneOthers + ", oneSubtotal="
				+ oneSubtotal + ", outfallNumber=" + outfallNumber
				+ ", outfallOthers=" + outfallOthers + ", outfallSubtotal="
				+ outfallSubtotal + ", outfallWaterPurification="
				+ outfallWaterPurification + ", outfallWaterSupplies="
				+ outfallWaterSupplies + ", pollutionSourceNumber="
				+ pollutionSourceNumber + ", principal=" + principal
				+ ", remarks=" + remarks + ", riverNumber=" + riverNumber
				+ ", subject=" + subject + ", twoCityManagement="
				+ twoCityManagement + ", twoEnvironment=" + twoEnvironment
				+ ", twoFarming=" + twoFarming + ", twoOthers=" + twoOthers
				+ ", twoSubtotal=" + twoSubtotal + "]";
	}

	
}