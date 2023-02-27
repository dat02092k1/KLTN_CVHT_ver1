export const getUsername = () => {
    const username = window.sessionStorage.getItem("username");
    return username; 
  } 

export const getRole = () => {
    const role = window.sessionStorage.getItem("role");
    return role; 
  } 
        

export const getClass = () => {
    const _class = window.sessionStorage.getItem("class");
    return _class; 
  } 