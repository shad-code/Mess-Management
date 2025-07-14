export const saveRole=(role)=>{
    localStorage.setItem("role",role);
}

export const getRole =()=>{
    localStorage.getItem("role");
}

export const clearAuth=()=>{
    localStorage.removeItem("role")
}