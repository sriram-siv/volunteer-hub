import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'
const baseUrlCampaigns = baseUrl + '/campaigns'
const baseUrlProfiles = baseUrl + '/profiles'

const withHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

export const registerUser = formData => axios.post(`${baseUrl}/auth/register/`, formData)

export const loginUser = formData => axios.post(`${baseUrl}/auth/login/`, formData)

export const getAllProfiles = () => axios.get(`${baseUrlProfiles}/`)

export const getSingleProfile = profileId => axios.get(`${baseUrlProfiles}/${profileId}/`)

export const updateProfile = (profileId, formData) => axios.put(`${baseUrlProfiles}/${profileId}/`, formData, withHeaders())

export const deleteProfile = profileId => axios.delete(`${baseUrlProfiles}/${profileId}/`, withHeaders())


export const createCampaign = formData => axios.post(`${baseUrlCampaigns}/`, formData, withHeaders())

export const getAllCampaigns = () => axios.get(`${baseUrlCampaigns}/`)

export const getSingleCampaign = campaignId => axios.get(`${baseUrlCampaigns}/${campaignId}/`)

export const updateCampaign = (campaignId, formData) => axios.put(`${baseUrlCampaigns}/${campaignId}/`, formData, withHeaders())

export const deleteCampaign = campaignId => axios.delete(`${baseUrlCampaigns}/${campaignId}/`, withHeaders())


// USER ADDS SELF AS PENDING VOLUNTEER
export const addPendVolunteer = campaignId => axios.post(`${baseUrlCampaigns}/${campaignId}/volunteers/`, null, withHeaders())

// CAMPAIGN COORDINATOR MOVES PENDING VOLUNTEER TO CONFIRMED, REQUEST BODY NEEDS TO INCLUDE 'volunteer_id': id
export const confirmVolunteer = (campaignId, formData) => axios.put(`${baseUrlCampaigns}/${campaignId}/volunteers/`, formData, withHeaders())

// CAMPAIGN COORDINATOR OR USER-VOLUNTEER CAN REMOVE VOLUNTEER FROM CAMPAIGN (PENDING & CONFIRMED)
// BODY NEEDS TO INCLUDE 'volunteer_id': id REGARDLESS OF LOGGED IN USER
export const removeVolunteer = (campaignId, formData) => axios.delete(`${baseUrlCampaigns}/${campaignId}/volunteers/`, formData, withHeaders())

// SKILL POST & DELETE REQUESTS REQUIRE 'skill_id' IN REQUEST BODY
export const getAllSkills = () => axios.get(`${baseUrl}/skills/`)

export const addProfileSkill = (profileId, formData) => axios.post(`${baseUrlProfiles}/${profileId}/skills/`, formData, withHeaders())

export const removeProfileSkill = (profileId, formData) => axios.delete(`${baseUrlProfiles}/${profileId}/skills/`, formData, withHeaders())

export const addCampaignSkill = (campaignId, formData) => axios.post(`${baseUrlCampaigns}/${campaignId}/skills/`, formData, withHeaders())

export const removeCampaignSkill = (campaignId, formData) => axios.delete(`${baseUrlCampaigns}/${campaignId}/skills/`, formData, withHeaders())


export const getAllRooms = () => axios.get(`${baseUrl}/rooms/`)

export const createRoom = formData => axios.post(`${baseUrl}/rooms/`, formData)

export const getSingleRoom = roomId => axios.get(`${baseUrl}/rooms/${roomId}`)
