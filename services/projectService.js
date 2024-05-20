
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
export const getCost = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/costs/${id}`, {headers})
}   
export const createCosts = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/costs', project, {headers})
}   
export const updateCosts = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/costs/${id}`, project, {headers})
} 
export const deleteCosts = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/costs/${id}`, {headers})
}

//Recipes
export const getRecipes = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/recipes', {headers})
}    
export const getRecipe = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/recipes/${id}`, {headers})
}   
export const createRecipes = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/recipes', project, {headers})
}   
export const updateRecipes = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/recipes/${id}`, project, {headers})
} 
export const deleteRecipes = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/recipes/${id}`, {headers})
}

//RawMaterials
export const getRawMaterials = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/rawmaterials', {headers})
}    
export const getRawMaterial = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/rawmaterials/${id}`, {headers})
}   
export const createRawMaterials = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/rawmaterials', project, {headers})
}   
export const updateRawMaterials = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/rawmaterials/${id}`, project, {headers})
} 
export const deleteRawMaterials = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/rawmaterials/${id}`, {headers})
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
// export const updateProduct = (project, id, headers) => {
//     console.log("Route:",`/api/products/${id}`, project, { headers });
//     return useNuxtApp().$axiosApiClient.patch(`/api/products/${id}`, project, { headers });
// };
export const updateProduct = (formData, id, headers) => {
    console.log("Route:", `/api/products/${id}?_method=PUT`, formData, { headers });
    return useNuxtApp().$axiosApiClient.post(`/api/products/${id}?_method=PUT`, formData, { headers });
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
export const getTySkladall = (headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/sklads/`, { headers })
} 
export const getTySklad = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.get(`/api/sklads/${id}`, { headers })
}   
export const createSklad = (project, headers) =>{
    return useNuxtApp().$axiosApiClient.post('/api/sklads', project, { headers })
}   
export const updateSklad = (id, project, headers) =>{
    return useNuxtApp().$axiosApiClient.patch(`/api/sklads/${id}`, project, { headers })
} 
export const deleteSklad = (id, headers) =>{
    return useNuxtApp().$axiosApiClient.delete(`/api/sklads/${id}`, { headers })
}

//Отчеты
export const getOtchet = (productId, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const formData = new URLSearchParams();
    formData.append('productId', productId);

    return useNuxtApp().$axiosApiClient.post(`/api/products/calculate-cost`, formData, { headers });
}

//Количество объектов
export const getCountCosts = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/costs', {headers})
}    
export const getCountRecipes = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/recipes', {headers})
}    
export const getCountClients = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/clients', {headers})
}    
export const getCountEmployees = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/employees', {headers})
}    
export const getCountOrders = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/orders', {headers})
}    
export const getCountProducts = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/products', {headers})
}    
export const getCountRawMaterials = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/rawmaterials', {headers})
}    
export const getCountSklads = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/sklads', {headers})
}    
export const getCountSuppliers = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/suppliers', {headers})
}    
export const getCountTypeProducts = (headers) =>{
    return useNuxtApp().$axiosApiClient.get('/api/count/typeproducts', {headers})
}    
    
