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

  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }