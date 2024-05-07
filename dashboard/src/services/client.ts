const fetchData = async (url:string, options: any) => {
  try {
    const response = await fetch("", options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
