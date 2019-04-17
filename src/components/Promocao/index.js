import React from "react";

import { View, Text } from "react-native";

import styles from "./styles";

const Promocao = ({ carne, queijo, light }) => (
  <View style={styles.promotionContainer}>
    <Text style={styles.promotionText}>Promoções Ativas</Text>
    {light && (
      <View style={styles.promotionTitleContainer}>
        <Text style={styles.promotionTitle}>Light</Text>
        <Text style={styles.promotionDescription}>
          Com alface e sem bacon - 10% de desconto
        </Text>
      </View>
    )}
    {carne && (
      <View style={styles.promotionTitleContainer}>
        <Text style={styles.promotionTitle}>Muita Carne</Text>
        <Text style={styles.promotionDescription}>
          A cada 3 porções de carne o cliente só paga 2, 6 paga 4...
        </Text>
      </View>
    )}
    {queijo && (
      <View style={styles.promotionTitleContainer}>
        <Text style={styles.promotionTitle}>Muito Queijo</Text>
        <Text style={styles.promotionDescription}>
          A cada 3 porções de queijo o cliente só paga 2, 6 paga 4...
        </Text>
      </View>
    )}
  </View>
);

export default Promocao;
