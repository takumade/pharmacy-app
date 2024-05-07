const fetchData = async (method:string, path:string, body: any) => {
  try {
    const response = await fetch(`${process.env.BACKEND_API}/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('custom-auth-token')
      },
      body: JSON.stringify(body)

    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
