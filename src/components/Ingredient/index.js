import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";

import { convertFloatToBRLCurrency } from "../../helpers";

import styles from "./styles";

const Ingredient = ({ title, price, qtty, add, remove }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{convertFloatToBRLCurrency(price)}</Text>
    </View>
    <View style={styles.actionContainer}>
      <Icon
        size={16}
        name="minus"
        type="font-awesome"
        color="#f50"
        onPress={remove}
      />
      <Text>{qtty}</Text>
      <Icon
        size={16}
        name="plus"
        type="font-awesome"
        color="#f50"
        onPress={add}
      />
    </View>
  </View>
);

export default Ingredient;
