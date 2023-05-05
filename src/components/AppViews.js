import { Outlet, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { BookSearch } from "./books/BookSearch";
import Profile from "./profile/Profile";
import ReadList from "./books/ReadList";
import { addToReadList, addToTbReadList } from "./ApiManager";
import TbrList from "./books/TbrList";
import Prompts from "./prompts/PromptPage";

function AppViews() {
  const [readList, setReadList] = useState([]);
  const [tbList, setTbList] = useState([]);
  const handleAddToReadList = (book) => {
    addToReadList(book).then((newBook) => {
      setReadList([...readList, newBook]);
    });
  };

  const handleAddToTbList = (book) => {
    addToTbReadList(book).then((tbrBook) => {
      setTbList([...tbList, tbrBook]);
    });
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route path="" element={<Profile />} />
        <Route path="/books" element={<ReadList readList={readList} />} />
        <Route path="/books/tbr" element={<TbrList tbList={tbList} />} />
        <Route path="/search" element={<BookSearch />} />
      </Route>
      <Route path="/prompts" element={<Prompts />} />
    </Routes>
  );
}

export default AppViews;
