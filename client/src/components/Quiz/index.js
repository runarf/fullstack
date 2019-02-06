import React from 'react';
import {
  Button,
  Grommet,
  Box,
  Image
} from 'grommet';

function shuffle(a) {
  for (
    let i = a.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min
  );
}

class Quiz extends React.Component {
  state = {
    currentQueen: '',
    queens: [],
    alternatives: [],
    background: 'brown'
  };

  async componentDidMount() {
    const response = await fetch(
      'http://www.nokeynoshade.party/api/queens/all'
    );
    const queens = await response.json();
    this.setState({
      queens
    });
    this.getRandomQueen();
  }

  getRandom = () => {
    const { queens } = this.state;
    const currentQueen =
      queens[
        getRandomInt(
          0,
          queens.length - 1
        )
      ];
    return currentQueen;
  };

  getRandomQueen = () => {
    const currentQueen = this.getRandom();

    fetch(currentQueen.image_url)
      .then(() =>
        console.log('image works')
      )
      .catch(err =>
        console.log(
          'image does not work'
        )
      );

    const alternative1 = this.getRandom();
    const alternative2 = this.getRandom();

    const alternatives = shuffle([
      currentQueen.name,
      alternative1.name,
      alternative2.name
    ]);

    this.setState({
      currentQueen,
      alternatives
    });
  };

  checkAnswer = answer => {
    const { currentQueen } = this.state;
    let color;
    if (currentQueen.name === answer) {
      color = 'green';
    } else {
      color = 'red';
    }

    this.setState({
      background: color
    });

    this.getRandomQueen();
  };

  render() {
    const {
      currentQueen,
      alternatives,
      background
    } = this.state;
    console.log(currentQueen);
    return (
      <Grommet>
        <Box
          align="center"
          justify="center"
          background={background}
          fill
        >
          {currentQueen &&
            alternatives && (
              <Box>
                <Box height="small">
                  <Image
                    src={
                      currentQueen.image_url
                    }
                    fit="contain"
                  />
                </Box>
                <Box
                  direction="row"
                  justify="center"
                  wrap
                >
                  {alternatives.map(
                    (
                      alternative,
                      index
                    ) => (
                      <Box
                        border
                        key={index}
                        margin="small"
                      >
                        <Button
                          onClick={() =>
                            this.checkAnswer(
                              alternative
                            )
                          }
                        >
                          {alternative}
                        </Button>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            )}
        </Box>
      </Grommet>
    );
  }
}

export default Quiz;
