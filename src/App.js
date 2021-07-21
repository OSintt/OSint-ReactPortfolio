import { useEffect, useState, Suspense, lazy } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Slide from 'react-reveal/Slide';
import Audio from './components/audio';
import LoadingScreen from './components/loadingScreen';
import './App.css';

const Home = lazy(() => import('./components/home'));
const Projects = lazy(() => import('./components/projects'));
const Contact = lazy(() => import('./components/contact'));
const About = lazy(() => import('./components/about'));
const Comments = lazy(() => import('./components/comments'));
const Post = lazy(() => import('./components/post'));
const Admin = lazy(() => import('./components/admin'));

import { url } from './components/config.json';

function App() {
  const [isAdmin, setAdmin] = useState(false);

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

  useEffect(() => {
    async function checkAdmin() {
      if (window.localStorage.token !== null) {

        let res = await axios.get(`${url}/api/checkadm`, 
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
          }
        })
        
        if (res.data.message === true) return setAdmin(true);
      }
    }
    checkAdmin(); 
  }, []);

  return (
    <Router>
      <Route path="/" component={Audio} />
      <Switch>
        <Route exact path="/admin-login">
          <Suspense fallback={<LoadingScreen/>}>
            <Admin setAdmin={setAdmin}/>
          </Suspense>
        </Route>
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
        <Route exact path="/post">
          <Suspense fallback={<LoadingScreen />}>
            <Post />
          </Suspense>
        </Route>
        <Route path="/comments">
          <Suspense fallback={<LoadingScreen/>}>
            <Comments isAdmin={isAdmin}/>
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
