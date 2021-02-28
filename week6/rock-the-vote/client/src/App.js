import {React, useState, useContext} from 'react';
import Auth from './components/auth/Auth';
import Shell from './components/Shell';
import Issues from './components/Issues';
import Profile from './components/Profile';
import CreateIssue from './components/CreateIssue';
import IssuePage from './components/IssuePage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { UserContext } from './context/UserProvider';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  const [pageHeader, setPageHeader] = useState("");
  const { token } = useContext(UserContext);

  return (
    <div>
      <Shell page={pageHeader}>
          <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/issues" /> : <Auth setPageHeader={setPageHeader}/> }
            </Route>

            <ProtectedRoute 
            redirectTo='/' 
            path="/profile"
            token={token}>
              <Profile setPageHeader={setPageHeader}/>
            </ProtectedRoute>

            <ProtectedRoute 
            redirectTo='/'
            path="/issues"
            token={token}
            exact>
              <Issues setPageHeader={setPageHeader}/>
            </ProtectedRoute>

            <ProtectedRoute 
            redirectTo='/' 
            path="/issues/:issue_id" 
            render={(props) => <IssuePage setPageHeader={setPageHeader} {...props}/>} 
            token={token}/>
            
            <ProtectedRoute 
            redirectTo='/' 
            path="/create"
            token={token}>
              <CreateIssue setPageHeader={setPageHeader}/>
            </ProtectedRoute>

            <Route path="*">
              <h2>404: Not Found.</h2>
            </Route>
          </Switch>
      </Shell>
    </div>
  );
}

export default App;
