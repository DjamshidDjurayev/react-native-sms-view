import React, { PureComponent } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import PNText from '../PNText';
import strings from '../../../utils/strings';
import colors from '../../../utils/colors';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';

const ANIMATION_IN_DURATION = 350;

class TimerRequestCode extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.scale = timing({
      duration: ANIMATION_IN_DURATION,
      from: 0.01,
      to: 1,
      easing: Easing.elastic(1.5),
    });
  }

  render() {
    const { onClick } = this.props;

    return (
      <>
        <Animated.View
          style={[
            styles.requestCodeContainer,
            {
              transform: [
                {
                  scale: this.scale,
                },
              ],
            },
          ]}>
          <PNText
            title={strings.did_not_receive_code}
            textSize={18}
            textColor={colors.gray_A5}
            containerStyle={styles.requestCodeTitle}
          />

          <TouchableOpacity onPress={onClick}>
            <PNText title={strings.request_new_code} textSize={18} />
          </TouchableOpacity>
        </Animated.View>
      </>
    );
  }
}

const styles = EStyleSheet.create({
  requestCodeContainer: {
    marginTop: '10rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestCodeTitle: {
    marginRight: '6rem',
  },
});

export default TimerRequestCode;
