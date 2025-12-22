import api from './api';

export const adminUsersAPI = {
  login: (email: string, password: string) => 
    api.post('/admin-users/login', { email, password }),
  
  getProfile: () => 
    api.get('/admin-users/'),
  
  updateProfile: (data: any) => 
    api.put('/admin-users', data),
  
  getAllUsers: () => 
    api.get('/admin-users'),
  
  createUser: (userData: any) => 
    api.post('/admin-users/register', userData),
  
  updateUser: (id: string, userData: any) => 
    api.put(`/admin-users/${id}`, userData),
  
  deleteUser: (id: string) => 
    api.delete(`/admin-users/${id}`),
};

export const organizationsAPI = {
  getAll: () => 
    api.get('/organizations'),
  
  getById: (id: string) => 
    api.get(`/organizations/${id}`),
  
  create: (organizationData: any) => 
    api.post('/organizations', organizationData),
  
  update: (id: string, organizationData: any) => 
    api.put(`/organizations/${id}`, organizationData),
  
  delete: (id: string) => 
    api.delete(`/organizations/${id}`),
};

export const contactsAPI = {
  getAll: () => 
    api.get('/contacts'),
  
  getById: (id: string) => 
    api.get(`/contacts/${id}`),
  
  create: (contactData: any) => 
    api.post('/contacts', contactData),
  
  update: (id: string, contactData: any) => 
    api.put(`/contacts/${id}`, contactData),
  
  delete: (id: string) => 
    api.delete(`/contacts/${id}`),
};