import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'
const baseUrlCampaigns = baseUrl + '/campaigns/'

const withHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

export const registerUser = formData => axios.post(`${baseUrl}/auth/register/`, formData)

export const loginUser = formData => axios.post(`${baseUrl}/auth/login/`, formData)

export const getAllProfiles = () => axios.get(`${baseUrl}/profiles/`)

export const getSingleProfile = profileId => axios.get(`${baseUrl}/profiles/${profileId}/`)

export const updateProfile = (profileId, formData) => axios.put(`${baseUrl}/profiles/${profileId}/`, formData, withHeaders())


export const createCampaign = formData => axios.post(`${baseUrlCampaigns}`, formData, withHeaders())

export const getAllCampaigns = () => axios.get(`${baseUrlCampaigns}`)

export const getSingleCampaign = campaignId => axios.get(`${baseUrlCampaigns}${campaignId}/`)

export const updateCampaign = (campaignId, formData) => axios.put(`${baseUrlCampaigns}${campaignId}/`, formData, withHeaders())

export const deleteCampaign = campaignId => axios.delete(`${baseUrlCampaigns}${campaignId}/`, withHeaders())


// USER ADDS SELF AS PENDING VOLUNTEER
export const addPendVolunteer = campaignId => axios.post(`${baseUrlCampaigns}${campaignId}/volunteers/`, withHeaders())

// CAMPAIGN COORDINATOR MOVES PENDING VOLUNTEER TO CONFIRMED, REQUEST BODY NEEDS TO INCLUDE 'volunteer_id': id
export const confirmVolunteer = (campaignId, formData) => axios.put(`${baseUrlCampaigns}${campaignId}/volunteers/`, formData, withHeaders())