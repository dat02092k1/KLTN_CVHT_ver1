export const getUsername = () => {
    const username = window.localStorage.getItem("username");
    return username; 
  } 

export const getRole = () => {
    const role = window.localStorage.getItem("role");
    return role; 
  } 
        

export const getClass = () => {
    const _class = window.localStorage.getItem("class");
    return _class; 
  } 

export const getId = () => {
    const id = window.localStorage.getItem("_id");
    return id; 
  } 

