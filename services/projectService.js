//Login
   export const createlogin = (data) =>{
    return useNuxtApp().$axiosApiClient.post('/api/login', data)
}

//Clients
// export const getProjects = () =>{
//     return useNuxtApp().$axiosApiClient.get('/api/clients')
// }    
// export const getProject = (id) =>{
//     return useNuxtApp().$axiosApiClient.get(`/api/clients/${id}`)
// }   
// export const createProject = (project) =>{
//     return useNuxtApp().$axiosApiClient.post('/api/clients', project)
// }   
// export const updateProject = (id, project) =>{
//     return useNuxtApp().$axiosApiClient.patch(`/api/clients/${id}`, project)
// } 
// export const deleteProject = (id) =>{
//     return useNuxtApp().$axiosApiClient.delete(`/api/clients/${id}`)
// }

//Orders
export const getProjects = () =>{
    return useNuxtApp().$axiosApiClient.get('/api/orders')
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