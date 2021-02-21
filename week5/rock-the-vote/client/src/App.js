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
            <Route path="/profile">
              <Profile setPageHeader={setPageHeader}/>
            </Route>
            <Route exact path="/issues">
              <Issues setPageHeader={setPageHeader}/>
            </Route>
            <Route path="/issues/:issue_id" render={(props) => <IssuePage setPageHeader={setPageHeader} {...props}/>} />
            <Route path="/create">
              <CreateIssue setPageHeader={setPageHeader}/>
            </Route>
            <Route path="*">
              <h2>404: Not Found.</h2>
            </Route>
          </Switch>
      </Shell>
    </div>
  );
}

export default App;
