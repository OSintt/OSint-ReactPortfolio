import { useEffect, Suspense, lazy } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import Audio from './components/audio';
import LoadingScreen from './components/loadingScreen';
import './App.css';

const Home = lazy(() => import('./components/home'));
const Projects = lazy(() => import('./components/contact'));
const Contact = lazy(() => import('./components/contact'));
const About = lazy(() => import('./components/about'));


function App() {
  useEffect(() => {
    async function changeTitle() { 
      const osint = ["O", "$", "i", "n", "t", "#", "0", "8", "0", "0"];
      document.title = "";
      for (let x = 0; x < osint.length; x++) {
        document.title += osint[x];
        await new Promise(async resolve => {
          setTimeout(resolve, 1500);
        });
      }
    }
    changeTitle();
  }, []);

  return (
    <Router>
      <Slide left>
        <Audio />
      </Slide>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<LoadingScreen />}>
            <Home />
          </Suspense>
        </Route>
        <Route exact path="/about">
          <Suspense fallback={<LoadingScreen />}>
            <About />
          </Suspense>
        </Route>
        <Route exact path="/contact">
          <Suspense fallback={<LoadingScreen />}>
            <Contact />
          </Suspense>
        </Route>
        <Route exact path="/projects">
          <Suspense fallback={<LoadingScreen />}>
            <Projects />
          </Suspense>
        </Route>
        <Route path="*">
          <Suspense fallback={<LoadingScreen />}>
            <Slide bottom>
              <div className="error">
                <h1>Error 404</h1>
                <hr/>
                <code>TypeError:<br/>cannot read property "page" of undefined</code>
                <Link className="cross" to="/">🍩<span> Go back</span></Link>
              </div>
            </Slide>
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
