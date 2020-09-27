import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import colors from '../../../utils/colors';
import { toDp } from '../../../utils/screenUtils';
import fontHelper from '../../../utils/fontHelper';

const ANIMATION_IN_DURATION = 190;
const ANIMATION_OUT_DURATION = 220;

class SmsInput extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    textSize: PropTypes.number,
    textColor: PropTypes.string,
    textFont: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: colors.white,
    textSize: 20,
    textColor: colors.black,
    textFont: fontHelper.OpenSansSemiBold,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.maxHeight = toDp(26);
    this.animatedHeight = new Animated.Value(this.maxHeight);
    this.opacity = new Animated.Value(0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value;
  }

  render() {
    const { backgroundColor, textSize, textColor, textFont } = this.props;

    return (
      <View
        style={[
          styles.rootView,
          {
            backgroundColor,
          },
        ]}>
        <Animated.Text
          style={[
            {
              fontFamily: textFont,
              fontSize: toDp(textSize),
              color: textColor,
              height: this.maxHeight,
              opacity: this.opacity,
              transform: [
                {
                  translateY: this.animatedHeight,
                },
              ],
            },
          ]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {this.state.value}
        </Animated.Text>
      </View>
    );
  }

  add = (value, callback, animated = true) => {
    this.animatedHeight = new Animated.Value(this.maxHeight);
    this.opacity = new Animated.Value(0);

    this.setState({ value }, () => {
      Animated.parallel([
        Animated.timing(this.animatedHeight, {
          duration: animated ? ANIMATION_IN_DURATION : 0,
          toValue: 0,
          easing: Easing.elastic(1.5),
        }),
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: animated ? ANIMATION_IN_DURATION : 0,
          easing: Easing.linear,
        }),
      ]).start(() => {
        callback && callback();
      });
    });
  };

  remove = (callback, animated = true) => {
    Animated.parallel([
      Animated.timing(this.animatedHeight, {
        duration: animated ? ANIMATION_OUT_DURATION / 2 : 0,
        toValue: this.maxHeight,
        easing: Easing.elastic(0),
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: animated ? ANIMATION_OUT_DURATION / 4 : 0,
        easing: Easing.linear,
      }),
    ]).start(() => {
      callback && callback();

      this.setState({
        value: '',
      });
    });
  };
}

const styles = EStyleSheet.create({
  rootView: {
    borderRadius: '12rem',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56rem',
    height: '56rem',
    margin: '6rem',
    overflow: 'hidden',
  },
});

export default SmsInput;
