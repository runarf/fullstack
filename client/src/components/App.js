import React, {
  Component
} from 'react';
import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';
import { Grommet, Box } from 'grommet';
import Quiz from './Quiz';
import { connect } from 'react-redux';
import * as actions from '../actions';

const About = () => (
  <Box>
    About me
    <Link to="/">Home</Link>
  </Box>
);

const Header = () => <Box>heia</Box>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Grommet>
        <BrowserRouter>
          <div>
            <Header />
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
      </Grommet>
    );
  }
}

export default connect(
  null,
  actions
)(App);
