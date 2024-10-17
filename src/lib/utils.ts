import axios, { AxiosRequestConfig } from "axios";

export const request = async (url: string, method: string, data?: object) => {
  try {
    const config: AxiosRequestConfig = {
      method: method,
      data: data ? data : null,
      url: `${url}`,
    };
    return (await axios(config))?.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};
