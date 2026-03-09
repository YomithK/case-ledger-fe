import api from './axios'

export const getAssignableUsers = (params) => api.get('/ref/assignable-users', { params })
