import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { convertFloatToBRLCurrency } from "../../helpers";

import styles from "./styles";

const Item = ({ title, description, price, icon, onClick }) => (
  <TouchableOpacity style={styles.container} onPress={onClick}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{convertFloatToBRLCurrency(price)}</Text>
    </View>
    <View>{icon}</View>
  </TouchableOpacity>
);

export default Item;
