import axios from "axios";
import API_CONFIG from "../config/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',

  },
  
});

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },
};

// Projects Services
export const projectsService = {
  getProjects: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROJECTS.LIST);
    return response.data;
  },
  createProject: async (projectData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.PROJECTS.CREATE, projectData);
    return response.data;
  },
  updateProject: async (id, projectData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.PROJECTS.UPDATE(id), projectData);
    return response.data;
  },
  deleteProject: async (id) => {
    const response = await api.delete(API_CONFIG.ENDPOINTS.PROJECTS.DELETE(id));
    return response.data;
  },
  getProjectDetails: async (id) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.PROJECTS.DETAILS(id));
    return response.data;
  },
};

// Mosques Services
export const mosquesService = {
  getMosques: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.MOSQUES.LIST);
    return response.data;
  },
  createMosque: async (mosqueData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.MOSQUES.CREATE, mosqueData);
    return response.data;
  },
  updateMosque: async (id, mosqueData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.MOSQUES.UPDATE(id), mosqueData);
    return response.data;
  },
  deleteMosque: async (id) => {
    const response = await api.delete(API_CONFIG.ENDPOINTS.MOSQUES.DELETE(id));
    return response.data;
  },
  getMosqueDetails: async (id) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.MOSQUES.DETAILS(id));
    return response.data;
  },
};

// Blocked Projects Services
export const blockedProjectsService = {
  getBlockedProjects: async () => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOCKED_PROJECTS.LIST);
    return response.data;
  },
  createBlockedProject: async (projectData) => {
    const response = await api.post(API_CONFIG.ENDPOINTS.BLOCKED_PROJECTS.CREATE, projectData);
    return response.data;
  },
  updateBlockedProject: async (id, projectData) => {
    const response = await api.put(API_CONFIG.ENDPOINTS.BLOCKED_PROJECTS.UPDATE(id), projectData);
    return response.data;
  },
  deleteBlockedProject: async (id) => {
    const response = await api.delete(API_CONFIG.ENDPOINTS.BLOCKED_PROJECTS.DELETE(id));
    return response.data;
  },
  getBlockedProjectDetails: async (id) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.BLOCKED_PROJECTS.DETAILS(id));
    return response.data;
  },
};

export default api; 