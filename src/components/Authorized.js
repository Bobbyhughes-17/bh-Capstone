import { Navigate, useLocation } from "react-router-dom"

export const useAuth = () => {
    const user = JSON.parse(localStorage.getItem("book_user"));
    return { user };
  };
  

function Authorized({ children }) {
    const location = useLocation()

    if (localStorage.getItem("book_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}

export default Authorized;
