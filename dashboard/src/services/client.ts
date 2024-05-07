const backendClient = async (method:string, path:string, body: any) => {
  try {

    let options: any = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('custom-auth-token')
      }
    }


    if (method.toUpperCase() == "POST"){
      options.body = JSON.stringify(body)
    }



    const response = await fetch(`${process.env.BACKEND_API}/api/${path}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default backendClient;
