export const getAccessToken = () => {
    const accessToken = window.sessionStorage.getItem("token");
    const config = {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    };
  
    return config;
  }
  