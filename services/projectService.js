
//Login
   export const createlogin = (data) =>{
    return useNuxtApp().$axiosApiClient.post('/api/login', data)
}

//Clients
export const getClients = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/clients', {headers})
}    
export const getClient = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/clients/${id}`, { headers })
}   
export const createClients = (project, headers) =>{
    
    return useNuxtApp().$axiosApiClient.post('/api/clients', project, { headers })
}  
export const updateClient = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/clients/${id}`, project, { headers })
} 
export const deleteClient = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/clients/${id}`, { headers })
}

//Suppliers
export const getSuppliers = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/suppliers', {headers})
}    
export const getSupplier = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/suppliers/${id}`, {headers})
}   
export const createSuppliers = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/suppliers', project, {headers})
}   
export const updateSuppliers = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/suppliers/${id}`, project, {headers})
} 
export const deleteSuppliers = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/suppliers/${id}`, {headers})
}

//Expenses
export const getCosts = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/costs', {headers})
}    
export const getCost = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/costs/${id}`)
}   
export const createCosts = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/costs', project)
}   
export const updateCosts = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/costs/${id}`, project)
} 
export const deleteCosts = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/costs/${id}`)
}

//Recipes
export const getRecipes = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/recipes', {headers})
}    
export const getRecipe = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/recipes/${id}`)
}   
export const createRecipes = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/recipes', project)
}   
export const updateRecipes = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/recipes/${id}`, project)
} 
export const deleteRecipes = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/recipes/${id}`)
}

//RawMaterials
export const getRawMaterials = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/rawmaterials', {headers})
}    
export const getRawMaterial = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/rawmaterials/${id}`)
}   
export const createRawMaterials = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/rawmaterials', project)
}   
export const updateRawMaterials = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/rawmaterials/${id}`, project)
} 
export const deleteRawMaterials = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/rawmaterials/${id}`)
}

//import axios,{ AxiosRequestConfig } from 'axios';
//Orders
export const getProjects = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/orders', {headers})
}    
export const getProject = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/orders/${id}`, {headers})
}   
export const createProject = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/orders', project, {headers})
}   
export const updateProject = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/orders/${id}`, project, {headers})
} 
export const deleteProject = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/orders/${id}`, {headers})
}

//Product
export const getProducts = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/products', {headers})
}    
export const getProduct = (id, headers) => {
    return useNuxtApp().$axiosApiClient.get(`/api/products/${id}`, { headers });
};   
export const createProduct = (project, headers) =>{
    console.log(project, headers);
    return useNuxtApp().$axiosApiClient.post('/api/products', project, { headers })
}  
export const updateProduct = (project, id, headers) => {
    console.log("Route:",`/api/products/${id}`, project, { headers });
    return useNuxtApp().$axiosApiClient.patch(`/api/products/${id}`, project, { headers });
};
export const deleteProduct = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/products/${id}`, { headers });
}

//TypeProduct
export const getTypeProducts = (token) => {
    return useNuxtApp().$axiosApiClient.get('/api/typeproducts', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};  
export const getTypeProducts2 = (headers) => {
    return useNuxtApp().$axiosApiClient.get('/api/typeproducts', { headers });
}; 
export const getTypeProduct = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/typeproducts/${id}`, { headers });
}   
export const createTypeProduct = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/typeproducts', project, { headers });
}
export const updateTypeProduct = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/typeproducts/${id}`, project, { headers });
}
export const deleteTypeProduct = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/typeproducts/${id}`, { headers });
}

//Sklad
export const getSklads = (token) => {
    return useNuxtApp().$axiosApiClient.get('/api/sklads', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};   
export const getTySklad = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/sklads/${id}`)
}   
export const createSklad = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/sklads', project)
}   
export const updateSklad = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/sklads/${id}`, project)
} 
export const deleteSklad = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/sklads/${id}`)
}
