import axios from 'axios';

const axiosIns = axios.create({
    baseURL: 'http://localhost:8000/'
});

const refreshToken = async () => {
    const getRefreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:8000/api/token-refresh', { refreshToken: getRefreshToken });
    console.log(response);
    const { accessToken, refreshToken } = response.data;
  
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return accessToken;
  };
  

axiosIns.interceptors.response.use((response) => {
    console.log('token where'); 
    return (response);
}, async (err) => {
    const originalRequest = err.config;
    console.log(originalRequest.headers.token);

    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
            const accessToken = await refreshToken();

            originalRequest.headers.token = `Bearer ${accessToken}`;
            console.log(originalRequest.headers.token);
            return axiosIns(originalRequest);
        } catch (error) {
            console.log('Refresh token failed', error);
        return Promise.reject(error);

        }
         
      }

    return Promise.reject(err);
});

export { axiosIns };
