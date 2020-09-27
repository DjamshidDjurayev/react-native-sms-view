import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, Animated, Vibration } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SmsInput from './SmsInput';
import PropTypes from 'prop-types';

const SHAKE_ANIMATION_DURATION = 90;

class SmsView extends PureComponent {
  cursorPosition = 0;
  fullCode = [];

  static propTypes = {
    onClick: PropTypes.func,
    onInputCompleted: PropTypes.func,
    onInputCleared: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.shakeAnimation = new Animated.Value(0);
  }

  componentDidMount() {}

  render() {
    const { onClick } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <Animated.View
          style={[
            styles.rootView,
            {
              transform: [{ translateX: this.shakeAnimation }],
            },
          ]}>
          <SmsInput
            key={'input_0'}
            ref={ref => {
              this.input_0 = ref;
            }}
          />
          <SmsInput
            key={'input_1'}
            ref={ref => {
              this.input_1 = ref;
            }}
          />
          <SmsInput
            key={'input_2'}
            ref={ref => {
              this.input_2 = ref;
            }}
          />
          <SmsInput
            key={'input_3'}
            ref={ref => {
              this.input_3 = ref;
            }}
          />
          <SmsInput
            key={'input_4'}
            ref={ref => {
              this.input_4 = ref;
            }}
          />
          <SmsInput
            key={'input_5'}
            ref={ref => {
              this.input_5 = ref;
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  add = value => {
    const { onInputCompleted } = this.props;

    if (this.cursorPosition >= 6) {
      return;
    }

    this[`input_${this.cursorPosition}`].add(value);
    this.fullCode.push(value);

    this.cursorPosition++;

    if (onInputCompleted && this.cursorPosition === 6) {
      // input completed
      onInputCompleted(this.fullCode.join('').toString());
    }
  };

  delete = () => {
    const { onInputCleared } = this.props;

    if (this.cursorPosition <= 0) {
      return;
    }

    this.cursorPosition--;

    this[`input_${this.cursorPosition}`].remove();
    // remove last element
    this.fullCode.pop();

    if (onInputCleared && this.cursorPosition === 0) {
      onInputCleared();
    }
  };

  showError = () => {
    Vibration.vibrate([10, 50, 60, 10]);

    Animated.sequence([
      Animated.timing(this.shakeAnimation, {
        toValue: 10,
        duration: SHAKE_ANIMATION_DURATION,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: -10,
        duration: SHAKE_ANIMATION_DURATION,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 10,
        duration: SHAKE_ANIMATION_DURATION,
      }),
      Animated.timing(this.shakeAnimation, {
        toValue: 0,
        duration: SHAKE_ANIMATION_DURATION,
      }),
    ]).start();
  };

  clearAll = (animated = false) => {
    if (this.fullCode.length === 0) {
      return;
    }

    for (let i = 0; i < 6; i++) {
      this[`input_${i}`].remove(null, animated);
    }
    // set cursor at beginning
    this.cursorPosition = 0;
    this.fullCode = [];
  };

  addAll = (animated = false, fullCode) => {
    if (!fullCode && fullCode.length < 6) {
      return; // TODO
    }
  };
}

const styles = EStyleSheet.create({
  rootView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20rem',
  },
});

export default SmsView;
