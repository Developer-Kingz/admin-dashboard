import axios from "axios";

export const apiCall = async ({ url, method, headers, data }) => { 
    try {
      const response = await axios.request({ 
        url,
        method,
        headers,
        data,
      });
      return response;
    } catch (error) {
      console.log(error)
      return error.response?.data || error.message
    }
  };

  export const abbreviateName = (fullName) => {
    const names = fullName.split(' '); 
    const abbreviatedFirstName = names[0].charAt(0); 
    const abbreviatedLastName = names[names.length - 1].charAt(0); 
    return abbreviatedFirstName + abbreviatedLastName;
  }