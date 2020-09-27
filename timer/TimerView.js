import React, { Component } from 'react';
import { View } from 'react-native';
import PNText from '../PNText';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import dateUtils from '../../../utils/dateUtils';
import TimerRequestCode from './TimerRequestCode';

const TIMER_DELAY_MS = 1000;
const TIMER_INITIAL_TIME_MS = 90 * TIMER_DELAY_MS;

class TimerView extends Component {
  static propTypes = {
    onRequestNewCodePress: PropTypes.func,
    onCounterStarted: PropTypes.func,
    onCounterFinished: PropTypes.func,
    showRequestNewCode: PropTypes.bool,
    countdown: PropTypes.number,
  };

  static defaultProps = {
    showRequestNewCode: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      time: props.countdown ? props.countdown : TIMER_INITIAL_TIME_MS,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.time !== this.state.time ||
      nextProps.showRequestNewCode !== this.props.showRequestNewCode
    );
  }

  render() {
    const { showRequestNewCode, onRequestNewCodePress } = this.props;

    return (
      <View style={styles.rootView}>
        <PNText
          title={dateUtils.counterFormat(this.state.time)}
          textSize={18}
        />

        {showRequestNewCode && (
          <TimerRequestCode
            onClick={() => {
              onRequestNewCodePress && onRequestNewCodePress();
            }}
          />
        )}
      </View>
    );
  }

  startTimer = () => {
    const { countdown, onCounterStarted, onCounterFinished } = this.props;

    if (this.timer) {
      this.stopTimer();
      this.timer = undefined;
      this.setState({
        time: countdown ? countdown : TIMER_INITIAL_TIME_MS,
      });
    }

    onCounterStarted && onCounterStarted();

    this.timer = setInterval(() => {
      if (this.state.time === TIMER_DELAY_MS) {
        onCounterFinished && onCounterFinished();
      }

      if (this.state.time === 0) {
        this.stopTimer();
      } else {
        this.setState({
          time: this.state.time - TIMER_DELAY_MS,
        });
      }
    }, TIMER_DELAY_MS);
  };

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  componentWillUnmount() {
    // clear timer
    this.stopTimer();
  }
}

const styles = EStyleSheet.create({
  rootView: {
    marginTop: '24rem',
    marginBottom: '24rem',
    marginLeft: '16rem',
    marginRight: '16rem',
    alignItems: 'center',
  },
});

export default TimerView;
