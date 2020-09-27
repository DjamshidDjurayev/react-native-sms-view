import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import PNText from '../PNText';
import { toDp } from '../../../utils/screenUtils';
import fontHelper from '../../../utils/fontHelper';
import ImageIcon from '../ImageIcon';
import colors from '../../../utils/colors';

class KeyView extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    labelSize: PropTypes.number,
    labelFont: PropTypes.string,
    labelColor: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    icon: PropTypes.number,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    label: '',
    labelSize: 22,
    labelFont: fontHelper.OpenSansSemiBold,
    width: 130,
    height: 70,
    iconSize: 30,
    color: colors.white,
  };

  render() {
    const {
      width,
      height,
      onPress,
      onLongPress,
      label,
      icon,
      color,
    } = this.props;

    return (
      <TouchableOpacity
        disabled={label.length === 0 && !icon}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          styles.rootView,
          {
            width: toDp(width),
            height: toDp(height),
            backgroundColor: color,
          },
          label.length === 0 && !icon && styles.pinKeyEmpty,
        ]}>
        {this.renderKeyContent()}
      </TouchableOpacity>
    );
  }

  renderKeyContent = () => {
    const {
      label,
      labelSize,
      labelFont,
      labelColor,
      icon,
      iconSize,
    } = this.props;

    if (icon) {
      return <ImageIcon icon={icon} size={iconSize} width={iconSize} />;
    }

    return (
      <PNText
        textSize={labelSize}
        font={labelFont}
        title={label}
        textColor={labelColor}
      />
    );
  };
}

const styles = EStyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgb(239, 239, 244)',
  },
  pinKeyEmpty: {
    backgroundColor: 'rgb(239, 239, 244)',
  },
});

export default KeyView;
