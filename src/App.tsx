import * as React from 'react';
import appStore from './configStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeContainer from './containers/Home';
import { Provider } from 'react-redux';
import './App.css';
import HeaderContainer from './components/Header';
import { APP_LOADING } from './constants';

class App extends React.Component {
  componentDidMount() {
    appStore.dispatch({ type: APP_LOADING });
  }
  
  render() {
    return (
      <Provider store={appStore}>
        <BrowserRouter>
          <div className="container">
            <HeaderContainer />
            <Switch>
              <Route path='/' exact component={HomeContainer}/>
              <Route exact path={`*`} component={() => <div>Opps !</div>}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
