import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import Quiz from './components/Quiz';

const Homepage = () => (
  <Box>
    <a href="/auth/google">
      Sign in to Google{' '}
    </a>
    <Link to="/about/">About</Link>
  </Box>
);

const About = () => (
  <Box>
    About me
    <Link to="/">Home</Link>
  </Box>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            path="/"
            exact
            component={Quiz}
          />
          <Route
            path="/about/"
            component={About}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
