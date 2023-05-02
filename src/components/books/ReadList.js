import React, { useState, useEffect } from "react";
import { getReadList } from "../ApiManager";
import TbrList from "./TbrList";
import "./Book.css";

function ReadList() {
  const [readList, setReadList] = useState([]);
  const [clickedBook, setClickedBook] = useState(null);
  const [isHidden, setIsHidden] = useState(true);

  const handleClick = (book) => {
    if (clickedBook === book) {
      setClickedBook(null);
    } else {
      setClickedBook(book);
    }
  };

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    getReadList().then((data) => {
      setReadList(data);
    });
  }, []);

  const addToReadList = (book) => {
    setReadList([...readList, book]);
  };

  return (
    <div className="flex justify-between w-full">
      <div className="w-1/2 pr-4">
        <h1 className="read-custom"  onClick={toggleHidden} toggleHidden={toggleHidden} isHidden={isHidden}>
          Read List
        </h1>
        {!isHidden && (
          <ul className="divide-y divide-gray-300">
            {readList.map((item) => (
              <li
                key={item.id}
                className="flex mb-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleClick(item)}
              >
                {clickedBook === item && (
                  <div className="w-1/4 mr-4">
                    <img src={item.thumbnail} alt="Book cover" className="w-full rounded-md" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                  {clickedBook === item && (
                    <div className="mt-2">
                      <p className="text-gray-700">
                        <strong>Author:</strong> {item.authors.join(", ")}
                      </p>
                      <p className="text-gray-700">
                        <strong>Pages:</strong> {item.pageCount} pages
                      </p>
                      <p className="text-gray-700">
                        <strong>Published Date:</strong> {item.publishedDate}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`w-full ${isHidden ? "hidden" : ""}`}>
        <TbrList addToReadList={addToReadList} toggleHidden={toggleHidden} isHidden={isHidden} />
      </div>
    </div>
  );
}

export default ReadList;
