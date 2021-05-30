import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { NavBar } from './views/NavBar/NavBar';
import NotFounded from './views/NotFounded/NotFounded';
import AdminContainer from './views/AdminContainer/AdminContainer';

function App() {
  return ( 
    <BrowserRouter>
      <NavBar/>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={AdminContainer}/>
          <Route exact path="/countries" component={AdminContainer}/>
          <Route exact path="/places" component={AdminContainer}/>
          <Route exact path="/organizations" component={AdminContainer}/>
          <Route component={NotFounded}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
