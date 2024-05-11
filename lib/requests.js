export async function fetchResponse(dataString) {
  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataString),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Assuming the server responds with JSON content
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchScore(dataString) {
  try {
    const response = await fetch("http://localhost:8000/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataString),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Assuming the server responds with JSON content
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
