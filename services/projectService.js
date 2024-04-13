
//Login
   export const createlogin = (data) =>{
    return useNuxtApp().$axiosApiClient.post('/api/login', data)
}

//Clients
export const getClients = () =>{
    return useNuxtApp().$axiosApiClient.get('/api/clients')
}    
export const getClient = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/clients/${id}`)
}   
export const createClients = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/clients', project)
}   
export const updateClient = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/clients/${id}`, project)
} 
export const deleteClient = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/clients/${id}`)
}

//import axios,{ AxiosRequestConfig } from 'axios';
//Orders
export const getProjects = (headers) =>{
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return useNuxtApp().$axiosApiClient.get('/api/orders', {headers})
}    
export const getProject = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/orders/${id}`)
}   
export const createProject = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/orders', project)
}   
export const updateProject = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/orders/${id}`, project)
} 
export const deleteProject = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/orders/${id}`)
}