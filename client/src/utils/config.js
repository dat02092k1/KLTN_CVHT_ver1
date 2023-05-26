export const getAccessToken = () => {
    const accessToken = window.localStorage.getItem("token");
    const config = {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    };
  
    return config;
  }
  