import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Routing.jsx";
import { DataContext, DataProvider } from "./Components/DataProvider/DataProvider.jsx";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/firebase.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);

        dispatch({
          type: Type.SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        });
      }
    });
  },[]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
