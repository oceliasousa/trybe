import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut, updateAssertions, updateScore } from '../redux/actions/index';
import { shuffleArray } from '../helpers/array';
import { addPlayerToRanking } from '../helpers/localStorage';
import './question.css';

class Question extends React.Component {
  state = {
    currentQuestionIndex: 0,
    questions: [],
    green: '',
    red: '',
    timer: 30,
    disabled: false,
    nextBtnHidden: true,
  };

  async componentDidMount() {
    const tokenNotFoundError = 3;
    const tokenEmptyError = 4;
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();

    if (data.response_code === tokenNotFoundError
      || data.response_code === tokenEmptyError) {
      const { dispatch, history } = this.props;
      await dispatch(logOut());
      history.push('/');
    } else {
      const { results } = data;
      results.forEach(
        (result) => {
          result.answers = shuffleArray(
            result.incorrect_answers.concat([result.correct_answer]),
          );
        },
      );
      this.setState({ questions: results });
    }
    this.timer();
  }

  timer = () => {
    const seconds = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer <= 0) {
          clearInterval(this.interval);
          this.setState({
            timer: 0,
            disabled: true,
          });
        }
      });
    }, seconds);
  };

  handleNextQuestion = () => {
    const { currentQuestionIndex } = this.state;
    const { history, player } = this.props;
    const NUMBER_FOUR = 4;
    const newCurrentQuestion = currentQuestionIndex + 1;
    this.setState({
      currentQuestionIndex: newCurrentQuestion,
      nextBtnHidden: true,
      timer: 30,
      green: '',
      red: '',
      disabled: false,
    });
    clearInterval(this.interval);
    this.timer();
    if (currentQuestionIndex >= NUMBER_FOUR) {
      this.setState({
        currentQuestionIndex: 0,
      });
      addPlayerToRanking(player);
      history.push('/feedback');
    }
  };

  handleAnswerClick = (answer) => {
    const { questions, timer, currentQuestionIndex } = this.state;
    const { dispatch } = this.props;
    const NUMBER_ONE = 1;
    const NUMBER_TWO = 2;
    const NUMBER_THREE = 3;
    const NUMBER_TEN = 10;

    this.setState({
      green: 'green',
      red: 'red',
      nextBtnHidden: false,
      disabled: true,
    });

    const currentQuestion = questions[currentQuestionIndex];

    // Calculando o score
    if (currentQuestion.correct_answer === answer) {
      let difficulty;
      if (currentQuestion.difficulty === 'hard') {
        difficulty = NUMBER_THREE;
      } else if (currentQuestion.difficulty === 'medium') {
        difficulty = NUMBER_TWO;
      } else {
        difficulty = NUMBER_ONE;
      }
      const totalScore = NUMBER_TEN + (timer * difficulty);
      dispatch(updateScore(totalScore));
      dispatch(updateAssertions());
    }
  };

  render() {
    const { questions, currentQuestionIndex, green, red, timer,
      disabled, nextBtnHidden } = this.state;

    if (questions.length === 0) return;

    const question = questions[currentQuestionIndex];

    return (
      <div>
        <h2 data-testid="question-category">{question.category}</h2>
        <h3>
          {' '}
          Timer:
          {timer}
        </h3>
        <h3 data-testid="question-text">{question.question}</h3>
        <div data-testid="answer-options">
          {question.answers.map((answer, index) => (
            <button
              disabled={ disabled }
              key={ index }
              style={ {
                marginRight: '0.5rem',
                padding: '0.5rem',
              } }
              className={ answer === question.correct_answer
                ? green : red }
              type="button"
              onClick={ () => this.handleAnswerClick(answer) }
              data-testid={ answer === question.correct_answer
                ? 'correct-answer' : `wrong-answer-${index}` }
            >
              {answer}
            </button>))}
        </div>
        {!nextBtnHidden
          && (
            <button
              className="next-btn"
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
              type="button"
            >
              Next
            </button>)}
      </div>
    );
  }
}

Question.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.player.token,
  player: state.player,
});

export default connect(mapStateToProps)(Question);
