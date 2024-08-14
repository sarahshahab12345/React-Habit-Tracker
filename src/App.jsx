import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import NavBar from "./Components/NavBar";
import AddHabit from "./Components/AddHabit";
import ViewWeekly from "./Components/ViewWeekly";
import Auth from "./Components/Auth";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="loader"></div>
    </div>;
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/view-weekly" /> : <Auth />}
          />
          <Route
            path="/view-weekly"
            element={user ? <ViewWeekly /> : <Navigate to="/" />}
          />
          <Route
            path="/add-habit"
            element={user ? <AddHabit /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
