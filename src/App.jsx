import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/Dashboard";


function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);

  // Navigate between login & signup
  const handleNavigateToLogin = () => {
    setCurrentPage("login");
  };

  const handleNavigateToSignUp = () => {
    setCurrentPage("signUp");
  };

  // When login is successful → go to dashboard
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  if (currentPage === "login") {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignUp={handleNavigateToSignUp}
      />
    );
  } else if (currentPage === "signUp") {
    return <SignUpPage onNavigateToLogin={handleNavigateToLogin} />;
  } else if (currentPage === "dashboard") {
    return <DashboardPage user={user} />;
  } else {
    return null;
  }
}

export default App;
