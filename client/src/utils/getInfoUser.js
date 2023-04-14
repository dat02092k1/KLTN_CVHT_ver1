export const getUsername = () => {
    const username = window.localStorage.getItem("username");
    return username; 
  } 

export const getRole = () => {
    const role = window.localStorage.getItem("role");
    return role; 
  } 
        
  export const setClass = (arr) => {
    return arr.map((c) => c.name); 
  } 
 
export const getClass = () => {
    const _class = (window.localStorage.getItem("class"));
    return JSON.parse(_class); 
  } 

export const getStudentClass = () => {
    const _class = JSON.parse(window.localStorage.getItem("class"));
    return _class[0];
  } 
export const getId = () => {
    const id = window.localStorage.getItem("_id");
    return id; 
  } 

export const getRefreshToken = () => {
    const refreshToken = window.localStorage.getItem("refreshToken");
    return refreshToken; 
  } 