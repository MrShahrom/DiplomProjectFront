
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
//Product
export const getProducts = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/products', {headers})
}    
export const getProduct = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/products/${id}`)
}   
export const createProduct = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/products', project)
}   
export const updateProduct = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/products/${id}`, project)
} 
export const deleteProduct = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/products/${id}`)
}