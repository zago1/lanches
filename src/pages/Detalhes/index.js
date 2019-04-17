import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import api from "../../services/api";

import Ingredient from "../../components/Ingredient";
import Promocao from "../../components/Promocao";

import { convertFloatToBRLCurrency } from "../../helpers";

import styles from "./styles";

class Detalhes extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.lanche.title,
    headerTintColor: "#F1F1F1",
    headerStyle: {
      backgroundColor: "#f4511e"
    }
  });

  state = {
    loading: false,
    total: 0.0,
    ingredientes: [],
    totais: [],
    promocao: {
      light: null,
      carne: null,
      queijo: null
    }
  };

  componentDidMount() {
    const { lanche } = this.props.navigation.state.params;
    this.calcIngredientes(lanche);
  }

  calcIngredientes = item => {
    this.setState({ loading: true }, async () => {
      const response = await api.get("ingredientes");
      const ingredientes = response.data || [];

      let total = item.price;
      ingredientes.forEach(ingrediente => {
        ingrediente.qtty = 0;
        item.ingredientes.forEach(id => {
          if (ingrediente.id == id) {
            ingrediente.qtty += 1;
          }
        });
      });

      this.setState({ ingredientes, total, loading: false });
    });
  };

  calculaTotal = () => {
    const { ingredientes, promocao } = this.state;
    let novaPromo = { total: 0, promoOn: false };
    let total = 0;

    let alface = ingredientes.findIndex(ingrediente => ingrediente.id == 1);
    let bacon = ingredientes.findIndex(ingrediente => ingrediente.id == 2);

    ingredientes.forEach(ingrediente => {
      if (ingrediente.id == 3) {
        novaPromo = this.promoLeveTresPagueDois(ingrediente);
        total += novaPromo.total;
        promocao.carne = novaPromo.promoOn;
      } else if (ingrediente.id == 5) {
        novaPromo = this.promoLeveTresPagueDois(ingrediente);
        total += novaPromo.total;
        promocao.queijo = novaPromo.promoOn;
      } else {
        total += ingrediente.qtty * ingrediente.price;
      }
    });

    novaPromo = this.promoLight(
      ingredientes[bacon],
      ingredientes[alface],
      total
    );

    promocao.light = novaPromo.promoOn;
    total -= novaPromo.total;

    this.setState({ total, promocao });
  };

  promoLight = (bacon, alface, total) => {
    return {
      promoOn: bacon.qtty == 0 && alface.qtty > 0,
      total: bacon.qtty == 0 && alface.qtty > 0 ? total * 0.1 : 0
    };
  };

  promoLeveTresPagueDois = ingrediente => {
    let total = 0;
    if (ingrediente.qtty % 3 == 0) {
      total = ingrediente.price * ingrediente.qtty * (2 / 3);
    } else {
      total = ingrediente.qtty * ingrediente.price;
    }

    return {
      promoOn: ingrediente.qtty > 0 && ingrediente.qtty % 3 == 0,
      total
    };
  };

  add = id => {
    const { ingredientes } = this.state;
    ingredientes[
      ingredientes.findIndex(ingrediente => ingrediente.id == id)
    ].qtty += 1;

    this.setState({ ingredientes }, this.calculaTotal);
  };

  remove = id => {
    const { ingredientes } = this.state;
    const index = ingredientes.findIndex(ingrediente => ingrediente.id == id);

    if (ingredientes[index].qtty > 0) {
      ingredientes[index].qtty -= 1;
    }

    this.setState({ ingredientes }, this.calculaTotal);
  };

  addLanche = () => {
    const { navigation } = this.props;
    Alert.alert("Sucesso!", "Lanche adicionado!");
    navigation.pop();
  };

  renderItem = ({ item }) => {
    return (
      <Ingredient
        key={item.id}
        title={item.title}
        price={item.price}
        qtty={item.qtty}
        add={() => this.add(item.id)}
        remove={() => this.remove(item.id)}
      />
    );
  };

  renderItemSeparator = () => <View style={styles.itemSeparator} />;

  renderActivityIndicator = () => (
    <ActivityIndicator size="small" color="#f4511e" />
  );

  renderView = () => {
    const { total, ingredientes, promocao } = this.state;

    return (
      <View style={styles.renderViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            <FlatList
              extraData={this.state}
              ItemSeparatorComponent={this.renderItemSeparator}
              keyExtractor={item => `${item.id}`}
              style={styles.flatList}
              data={ingredientes}
              renderItem={this.renderItem}
            />
          </View>
          <View>
            <Promocao
              carne={promocao.carne}
              queijo={promocao.queijo}
              light={promocao.light}
            />
          </View>
        </ScrollView>
        <View style={styles.totalContainer}>
          <TouchableOpacity style={styles.addButton} onPress={this.addLanche}>
            <Text style={styles.totalText}>
              Adicionar {convertFloatToBRLCurrency(total)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? this.renderActivityIndicator() : this.renderView()}
      </View>
    );
  }
}

export default Detalhes;
