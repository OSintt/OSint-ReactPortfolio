import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Projects from './components/projects';
import { NavLink as Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import Audio from './components/audio';
import { useEffect } from 'react';


function App() {
  useEffect(async () => {
    const osint = ["O", "$", "i", "n", "t", "#", "0", "8", "0", "0"]
    for (let x = 0; x < osint.length; x++) {
      document.title += osint[x]
      await new Promise(async resolve => {
        setTimeout(resolve, 1500);
      });
    }
  });
  return (
    <Router>
      <Slide left>
        <Audio />
      </Slide>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/projects">
          <Projects />
        </Route>
        <Route path="*">
          <Slide bottom>
            <div className="error">
              <h1>Error 404</h1>
              <hr/>
              <code>TypeError:<br/>cannot read property "page" of undefined</code>
              <Link className="cross" to="/">🍩<span> Go back</span></Link>
            </div>
          </Slide>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
