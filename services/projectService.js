
//Login
   export const createlogin = (data) =>{
    return useNuxtApp().$axiosApiClient.post('/api/login', data)
}

//Clients
export const getClients = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/clients', {headers})
}    
export const getClient = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/clients/${id}`)
}   
export const createClients = (project, headers) =>{
    
    return useNuxtApp().$axiosApiClient.post('/api/clients', project, { headers })
}  
export const updateClient = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/clients/${id}`, project)
} 
export const deleteClient = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/clients/${id}`)
}

//Suppliers
export const getSuppliers = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/suppliers', {headers})
}    
export const getSupplier = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/suppliers/${id}`)
}   
export const createSuppliers = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/suppliers', project)
}   
export const updateSuppliers = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/suppliers/${id}`, project)
} 
export const deleteSuppliers = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/suppliers/${id}`)
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
export const getProduct = (id, headers) => {
    return useNuxtApp().$axiosApiClient.get(`/api/products/${id}`, { headers });
};   
export const createProduct = (project, headers) =>{
    console.log(project, headers);
    return useNuxtApp().$axiosApiClient.post('/api/products', project, { headers })
}  
export const updateProduct = (project, id, headers) => {
    console.log("Route:",`/api/products/${id}`, project, { headers });
    console.log("project:",project);
    console.log("headers:",headers);
    console.log("id:",id);
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
export const getTypeProduct = (id) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/typeproducts/${id}`)
}   
export const createTypeProduct = (project) =>{
    return useNuxtApp().$axiosApiClient.post('/api/typeproducts', project)
}   
export const updateTypeProduct = (id, project) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/typeproducts/${id}`, project)
} 
export const deleteTypeProduct = (id) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/typeproducts/${id}`)
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
