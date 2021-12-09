import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/Login';
import ChatUI from './pages/ChatUI/ChatUI';
import AuthProvider from './context/AuthProvider';
import SignUp from './pages/Login/SignUp';
import AppProvider from './context/AppProvider';
import FriendsProvider from './context/FriendProvider';
import UserProvider from './context/UserProvider';



function App() {

  return (
    <BrowserRouter>
      <AuthProvider >
        <AppProvider>
          <UserProvider>
            <FriendsProvider>
              <Switch>
                <Route component={Login} path="/login" />
                <Route component={SignUp} path='/signup' />
                <Route component={ChatUI} path="/" />
              </Switch>
            </FriendsProvider>
          </UserProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
