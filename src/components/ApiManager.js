const API_KEY = "";
const baseUrl = "http://localhost:8088";
// fetch book from google
export const fetchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30&key=${API_KEY}`
  );
  const data = await response.json();
  return data.items || [];
};
// get all users from database
export const getAllUsers = () => {
  return fetch("http://localhost:8088/users")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching all users:", error);
    });
};

export const fetchBooksByGenre = async (genre, maxResults = 20) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${maxResults}&key=${API_KEY}&random=${Math.random()}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

// update users on database
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
};

export function addToReadList(query) {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Book added to read list:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error adding book to read list:", error);
    });
}
//
export const getReadList = () => {
  return fetch(`${baseUrl}/readlist`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
// add a book to the read list in the database
export const newRead = (read) => {
  return fetch(`${baseUrl}/readlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(read),
  }).then((response) => response.json());
};

export function addToTbReadList(query) {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Book added to read list:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error adding book to read list:", error);
    });
}
// add a book to the tbrlist in database
export const tbRead = (book) => {
  return fetch(`${baseUrl}/tbrlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  }).then((response) => response.json());
};
// get the tbr list from database
export const getTbrList = () => {
  return fetch(`${baseUrl}/tbrlist`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};
// update the tbr list in database
export const updateTbrList = (bookId, updates) => {
  return fetch(`${baseUrl}/tbrlist/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  }).then((response) => response.json());
};
// delete a book from the tbrlist
export const deleteFromTbrList = (bookId) => {
  return fetch(`${baseUrl}/tbrlist/${bookId}`, {
    method: "DELETE",
  }).then((response) => response.json());
};
// add a prompt to database
export const addPrompt = async (newPrompt) => {
  const response = await fetch(`${baseUrl}/prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPrompt),
  });
  if (!response.ok) {
    throw new Error(`Failed to add prompt: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
// get prompts from database
export const getAllPrompts = async () => {
  const response = await fetch(`${baseUrl}/prompts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch prompts: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
// add review to database
export function addReview(bookId, reviewData) {
  return fetch(`${baseUrl}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...reviewData, bookId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Book review added:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error adding review:", error);
    });
}
// get reviews from database
export const getReviews = async () => {
  const response = await fetch(`${baseUrl}/reviews`);
  if (!response.ok) {
    throw new Error(`Failed to fetch prompts: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
