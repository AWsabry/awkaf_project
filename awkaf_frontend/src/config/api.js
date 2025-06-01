// API Configuration
const API_CONFIG = {
  // Base URL for all API requests
  BASE_URL: "http://localhost:8080",
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/login",
      LOGOUT: "/api/logout",
    },
    PROJECTS: {
      LIST: "/api/projects",
      CREATE: "/api/projects",
      UPDATE: (id) => `/api/projects/${id}`,
      DELETE: (id) => `/api/projects/${id}`,
      DETAILS: (id) => `/api/projects/${id}`,
    },
    MOSQUES: {
      LIST: "/api/closed-mosques",
      CREATE: "/api/closed-mosques",
      UPDATE: (id) => `/api/closed-mosques/${id}`,
      DELETE: (id) => `/api/closed-mosques/${id}`,
      DETAILS: (id) => `/api/closed-mosques/${id}`,
    },
    BLOCKED_PROJECTS: {
      LIST: "/api/blocked-projects",
      CREATE: "/api/blocked-projects",
      UPDATE: (id) => `/api/blocked-projects/${id}`,
      DELETE: (id) => `/api/blocked-projects/${id}`,
      DETAILS: (id) => `/api/blocked-projects/${id}`,
    },
    USERS: {
      LIST: "/api/users",
      CREATE: "/api/users",
      UPDATE: (id) => `/api/users/${id}`,
      DELETE: (id) => `/api/users/${id}`,
      DETAILS: (id) => `/api/users/${id}`,
    },
  },
};

export default API_CONFIG; 