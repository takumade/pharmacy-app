import { setCookie, getCookie, getCookies } from 'cookies-next';
import { cookies } from 'next/headers';
import fetch from 'node-fetch';



const backendClient = async (method:string, path:string, body: any = {}) => {
  try {

    let options: any = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      }
    }


    let token = cookies().get('custom-auth-token')

    if (token) {
      options.headers.Authorization = token.value
    }


    if (method.toUpperCase() == "POST"){
      options.body = JSON.stringify(body)
    }


    let serverUrl = process.env.NEXT_PUBLIC_BACKEND_API ? process.env.NEXT_PUBLIC_BACKEND_API : process.env.BACKEND_API


    const response = await fetch(`${serverUrl}/api/${path}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default backendClient;
