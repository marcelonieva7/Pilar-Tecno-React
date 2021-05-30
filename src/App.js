import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { NavBar } from './views/NavBar/NavBar';
import ListContainer from './components/ListContainer/ListContainer';
import NotFounded from './views/NotFounded/NotFounded';

function App() {
  return ( 
    <BrowserRouter>
      <NavBar/>
      <div className="container-fluid mt-5">
        <Switch>
          <Route exact path="/" render={(props => <ListContainer {...props}/>)}>
          </Route>
          <Route exact path="/admin/:id" render={(props => <ListContainer {...props}/>)}>            
          </Route>
          <Route>
            <NotFounded></NotFounded>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
