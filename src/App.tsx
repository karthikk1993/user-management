import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import userManagementConstants from './utils/usermanagement-constants.ts';
import UserManagementWrapper from './containers/UserManagement/UserManagementWrapper.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import UserForm from './containers/UserForm/UserForm.tsx';

interface AppProps {
  appName?: string;
}

const App: React.FC<AppProps> = ({ appName = userManagementConstants.appName }) => {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <header className="App-header">
            <h2>{appName}</h2>
            <Routes>
              <Route path="/" element={<UserManagementWrapper />} />
              <Route path="/userList" element={<UserManagementWrapper />} />
              <Route path="/userForm" element={<UserForm />} />
            </Routes>
          </header>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
