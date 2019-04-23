import React from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import styles from './styles';

const Header = ({
  iconLeft, title, iconRight, containerStyle, titleStyle,
}) => (
  <View style={[styles.container, { ...containerStyle }]}>
    <View>{iconLeft}</View>
    <Text style={[styles.title, { ...titleStyle }]}>{title}</Text>
    <View>{iconRight}</View>
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  containerStyle: PropTypes.shape({}),
  titleStyle: PropTypes.shape({}),
};

Header.defaultProps = {
  iconLeft: null,
  iconRight: null,
  containerStyle: {},
  titleStyle: {},
};

const mapStateToProps = state => ({
  title: state.lanches.selectedLanche.title,
});

export default connect(mapStateToProps)(Header);
