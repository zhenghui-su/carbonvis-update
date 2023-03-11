import {Route} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';

import Header from './components/Header/Header.jsx';
import LargeScreenDisplay from './components/LargeScreenDisplay/LargeScreenDisplay.jsx';
import AnalysisDisplay from './components/AnalysisDisplay/AnalysisDisplay.jsx';
import IntroduceDisplay from './components/IntroduceDisplay/IntroduceDisplay.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
          <Route path='/home' component={LargeScreenDisplay} />
          <Route path='/analysisHome' component={AnalysisDisplay} />
          <Route path='/introduceHome' component={IntroduceDisplay} />
          <Redirect to="/introduceHome"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
