import React, { useState, useEffect } from "react";
import { getTbrList } from "../ApiManager";
import "./Book.css"
function TbrList({}) {
  const [isHidden, setIsHidden] = useState(true);
  const [tbrList, setTbrList] = useState([]);
  const [clickedBook, setClickedBook] = useState(null);

  const handleClick = (book) => {
    if (clickedBook === book) {
      setClickedBook(null);
    } else {
      setClickedBook(book);
    }
  };

  useEffect(() => {
    getTbrList().then((data) => {
      setTbrList(data);
    });
  }, []);


 const toggleHidden = () => {
    setIsHidden(!isHidden);
  };



  return (
    <div className="w-1/2 pl-2">
      <div className="tbr-w-1/2 pr-4">
        <h1 className="tbr-custom" onClick={toggleHidden}>
          TBR List
        </h1>
        {!isHidden && (
          <ul className="divide-y divide-gray-300 w-full">
            {tbrList.map((item) => (
              <li
                key={item.id}
                className="flex mb-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleClick(item)}
              >
                {clickedBook === item && (
                  <div className="tbr-w-1/4 mr-4">
                    <img src={item.thumbnail} alt="Book cover" className="w-full rounded-md" />
                  </div>
                )}
                <div className="tbr-flex-1">
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
    </div>
  );
}

export default TbrList;