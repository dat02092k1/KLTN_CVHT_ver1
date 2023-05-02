import axios from 'axios';
import router from "../router/index.js";

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
     
    return (response);
}, async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
            const accessToken = await refreshToken();

            originalRequest.headers.token = `Bearer ${accessToken}`;
            console.log(originalRequest.headers.token);
            return axiosIns(originalRequest);
        } catch (error) {
            console.log('Refresh token failed', error);
            alert('Phiên đăng nhập đã hết, vui lòng đăng nhập lại');
            localStorage.clear();
            router.push("/login");
        return Promise.reject(error);

        }
         
      }

    if (err.response.data.message === "Only image files are allowed") {
        alert('Vui lòng điền đúng định dạng file yêu cầu');
    }
    return Promise.reject(err);
});

export { axiosIns };
