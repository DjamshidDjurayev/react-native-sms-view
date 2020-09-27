import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import KeyView from './KeyView';
import Icons from '../../../utils/Icons';
import { toDp } from '../../../utils/screenUtils';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { timing } from 'react-native-redash';

const { Value, block, cond, eq, set, call } = Animated;

const ANIMATION_DURATION = 300;

const AnimationState = {
  UNDETERMINED: -1,
  SHOW: 1,
  HIDE: 0,
};

class KeyboardView extends PureComponent {
  static KEY_NUMBER = 'number';
  static KEY_BACKSPACE = 'backspace';
  static KEY_HIDE_KEYBOARD = 'hide_keyboard';

  static propTypes = {
    onKeyPress: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.height = toDp(280);
    this.animationState = new Value(AnimationState.UNDETERMINED);
    this.isShown = false;
    this.isAnimating = false;
    this.animated = new Value(this.height);
  }

  onAnimationShow = ([]) => {
    this.isAnimating = false;
    this.isShown = true;
  };

  onAnimationHide = ([]) => {
    this.isAnimating = false;
    this.isShown = false;
  };

  render() {
    return (
      <>
        <Animated.Code>
          {() =>
            block([
              cond(eq(this.animationState, AnimationState.SHOW), [
                set(
                  this.animated,
                  timing({
                    duration: ANIMATION_DURATION,
                    from: this.height,
                    to: 0,
                  }),
                ),
                cond(eq(this.animated, 0), call([], this.onAnimationShow)),
              ]),

              cond(eq(this.animationState, AnimationState.HIDE), [
                set(
                  this.animated,
                  timing({
                    duration: ANIMATION_DURATION,
                    from: 0,
                    to: this.height,
                  }),
                ),
                cond(
                  eq(this.animated, this.height),
                  call([], this.onAnimationHide),
                ),
              ]),
            ])
          }
        </Animated.Code>
        <Animated.View
          style={[
            styles.rootView,
            {
              height: this.height,
              transform: [
                {
                  translateY: this.animated,
                },
              ],
            },
          ]}>
          <View style={styles.rowContainer}>
            <KeyView
              label={'1'}
              onPress={() =>
                this.onKeyPressEventHandle(1, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              label={'2'}
              onPress={() =>
                this.onKeyPressEventHandle(2, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              label={'3'}
              onPress={() =>
                this.onKeyPressEventHandle(3, KeyboardView.KEY_NUMBER)
              }
            />
          </View>

          <View style={styles.rowContainer}>
            <KeyView
              label={'4'}
              onPress={() =>
                this.onKeyPressEventHandle(4, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              label={'5'}
              onPress={() =>
                this.onKeyPressEventHandle(5, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              label={'6'}
              onPress={() =>
                this.onKeyPressEventHandle(6, KeyboardView.KEY_NUMBER)
              }
            />
          </View>

          <View style={styles.rowContainer}>
            <KeyView
              label={'7'}
              onPress={() =>
                this.onKeyPressEventHandle(7, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              label={'8'}
              onPress={() =>
                this.onKeyPressEventHandle(8, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              label={'9'}
              onPress={() =>
                this.onKeyPressEventHandle(9, KeyboardView.KEY_NUMBER)
              }
            />
          </View>

          <View style={styles.rowContainer}>
            <KeyView
              icon={Icons.IC_KEYBOARD_HIDE}
              onPress={() =>
                this.onKeyPressEventHandle(-2, KeyboardView.KEY_HIDE_KEYBOARD)
              }
            />
            <KeyView
              label={'0'}
              onPress={() =>
                this.onKeyPressEventHandle(0, KeyboardView.KEY_NUMBER)
              }
            />
            <KeyView
              icon={Icons.IC_KEYBOARD_BACKSPACE}
              onPress={() =>
                this.onKeyPressEventHandle(-1, KeyboardView.KEY_BACKSPACE)
              }
              onLongPress={() =>
                this.onKeyPressEventHandle(-3, KeyboardView.KEY_BACKSPACE)
              }
            />
          </View>
        </Animated.View>
      </>
    );
  }

  onKeyPressEventHandle = (value, key) => {
    const { onKeyPress } = this.props;
    onKeyPress && onKeyPress(value, key);
  };

  show = () => {
    if (this.isAnimating || this.isShown) {
      return;
    }
    this.isAnimating = true;

    this.animationState.setValue(AnimationState.SHOW);
  };

  hide = () => {
    if (this.isAnimating || !this.isShown) {
      return;
    }
    this.isAnimating = true;
    this.animationState.setValue(AnimationState.HIDE);
  };
}

const styles = EStyleSheet.create({
  rootView: {
    height: '280rem',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  rowContainer: {
    flexDirection: 'row',
  },
});

export default KeyboardView;
