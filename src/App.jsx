import React, { useState } from "react";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/Dashboard";
import DiaryApp from "./pages/Diary";
import DiaryEntry from "./pages/DiaryEntry";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";


function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [diaryMode, setDiaryMode] = useState("list"); // 'list', 'write', 'edit', 'view'
  const [entryData, setEntryData] = useState(null);

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
    return <DashboardPage user={user} onNavigate={setCurrentPage} />;
  } else if (currentPage === "analytics") {
    return <AnalyticsDashboard />;
  } else if (currentPage === "diary") {
    if (diaryMode === "list") {
      return (
        <DiaryApp
          onNewEntry={() => { setDiaryMode("write"); setEntryData(null); }}
          onEditEntry={entry => { setDiaryMode("edit"); setEntryData(entry); }}
          onViewEntry={entry => { setDiaryMode("view"); setEntryData(entry); }}
          onBack={() => setCurrentPage("dashboard")}
        />
      );
    } else {
      return (
        <DiaryEntry
          mode={diaryMode}
          entry={entryData}
          onBack={() => { setDiaryMode("list"); setEntryData(null); }}
        />
      );
    }
  } else {
    return null;
  }
}

export default App;
