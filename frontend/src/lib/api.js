import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : '/api'

const baseUrlCampaigns = baseUrl + '/campaigns'
const baseUrlProfiles = baseUrl + '/profiles'

const withHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

export const checkToken = () => axios.get(`${baseUrl}/auth/token/`, withHeaders())

export const registerUser = formData => axios.post(`${baseUrl}/auth/register/`, formData)

export const loginUser = formData => axios.post(`${baseUrl}/auth/login/`, formData)

export const getSingleProfile = profileId => axios.get(`${baseUrlProfiles}/${profileId}/`)

export const updateProfile = (profileId, formData) => axios.put(`${baseUrlProfiles}/${profileId}/`, formData, withHeaders())

export const deleteProfile = profileId => axios.delete(`${baseUrlProfiles}/${profileId}/`, withHeaders())

export const updateProfileSkills = (profileId, formData) => axios.put(`${baseUrlProfiles}/${profileId}/skills/`, formData, withHeaders())

export const updateProfileShifts = (profileId, formData) => axios.put(`${baseUrlProfiles}/${profileId}/shifts/`, formData, withHeaders())


export const createCampaign = formData => axios.post(`${baseUrlCampaigns}/`, formData, withHeaders())

export const getAllCampaigns = () => axios.get(`${baseUrlCampaigns}/`)

export const getSingleCampaign = campaignId => axios.get(`${baseUrlCampaigns}/${campaignId}/`, withHeaders())

export const updateCampaign = (campaignId, formData) => axios.put(`${baseUrlCampaigns}/${campaignId}/`, formData, withHeaders())

export const deleteCampaign = campaignId => axios.delete(`${baseUrlCampaigns}/${campaignId}/`, withHeaders())

// BODY NEEDS TO INCLUDE 'volunteer_id': id and 'action': 'confirm', 'add', or 'delete' to put request
export const updateVolunteers = (campaignId, formData) => axios.put(`${baseUrlCampaigns}/${campaignId}/volunteers/`, formData, withHeaders())

export const getAllSkills = () => axios.get(`${baseUrl}/skills/`)

// Update campaign skill requires body of 'campaign_skills': array of skills
export const updateCampaignSkills = (campaignId, formData) => axios.put(`${baseUrlCampaigns}/${campaignId}/skills/`, formData, withHeaders())

export const addCampaignNotice = formData => axios.post(`${baseUrl}/notices/`, formData, withHeaders())

export const deleteCampaignNotice = noticeId => axios.delete(`${baseUrl}/notices/${noticeId}/`, withHeaders())


export const createRoom = formData => axios.post(`${baseUrl}/rooms/`, formData)

export const getSingleRoom = roomId => axios.get(`${baseUrl}/rooms/${roomId}/`, withHeaders())
