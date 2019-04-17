import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const Header = ({ iconLeft, title, iconRight, containerStyle, titleStyle }) => (
  <View style={[styles.container, { ...containerStyle }]}>
    <View>{iconLeft}</View>
    <Text style={[styles.title, { ...titleStyle }]}>{title}</Text>
    <View>{iconRight}</View>
  </View>
);

export default Header;
