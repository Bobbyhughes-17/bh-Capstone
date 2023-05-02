const API_KEY = '';
const baseUrl = ''
export const fetchBooks = async (query) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
    const data = await response.json();
    return data.items || [];
  }

  export const getAllUsers = () => {
    return fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching all users:", error);
      });
  }

  export const updateUser = (userId, formData) => {
    return fetch(`http://localhost:8088/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  }
  
  export function addToReadList(query) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Book added to read list:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error adding book to read list:", error);
      });
  }

  export const getReadList = () => {
    return fetch(`${baseUrl}/readlist`)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  export const newRead = (read) => {
    return fetch(`${baseUrl}/readlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(read)
    })
    .then(response => response.json())
  }

  export function addToTbReadList(query) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Book added to read list:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error adding book to read list:", error);
      });
  }

  
  export const tbRead = (read) => {
    return fetch(`${baseUrl}/tbrlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(read)
    })
    .then(response => response.json())
  }

  export const getTbrList = () => {
    return fetch(`${baseUrl}/tbrlist`)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }

  export const removeFromTbr = (id) => {
    return fetch(`${baseUrl}/tbrlist/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
  };
  

  export const addPrompt = async (newPrompt) => {
    const response = await fetch(`${baseUrl}/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPrompt)
    });
    if (!response.ok) {
      throw new Error(`Failed to add prompt: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };
  
  
  export const getAllPrompts = async () => {
    const response = await fetch(`${baseUrl}/prompts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch prompts: ${response.status}`);
    }
    const data = await response.json();
    return data;
  };


  