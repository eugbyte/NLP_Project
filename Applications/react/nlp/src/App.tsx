import React, { useEffect } from 'react';
import './App.css';
import { PreProcesingPage } from './containers/PreProcessing';
import { NavBar } from './components/Shared/Navbar';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { SearchPage } from './containers/SearchPage';
import { AnalysisPage } from './containers/AnalysisPage';
import { SavedResultsPage } from './containers/SavedResultsPage';

  function App(): JSX.Element {

    useEffect(() => {
      document.title = "NLP App"
    }, []);

  return (
    <div className="Center">
        <Router>
          <NavBar />  {/* The NavBar must be nested within the Router */}
          <Switch>
            <Route path="/documents" component={ PreProcesingPage } />  
            <Route path="/sentimentAnalysis" component={ AnalysisPage } />
            <Route path="/savedResults" component={ SavedResultsPage } />
            <Route exact path="/" component={ SearchPage }/>
          </Switch>
        </Router>
        

    </div>);
  }

  export default App;