import React, { Component } from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";

import api from "../../services/api";

import Item from "../../components/Item";
//import { dataLanches, ingredientes } from "../../data";

import styles from "./styles";

export default class Lanches extends Component {
  state = {
    lanches: [
      {
        id: 999,
        title: "Monte seu lanche",
        description: "Escolha todos os ingredientes que desejar.",
        price: 0.0
      }
    ],
    ingredientes: [],
    lancheSelecionado: {
      id: 0,
      title: "",
      description: "",
      price: 0,
      ingredientes: [0]
    },
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      await this.setIngredients();

      const { lanches } = this.state;
      const lanchesResponse = await api.get("lanches");
      const lanchesApi = lanchesResponse.data || [];

      lanchesApi.forEach(lanche => {
        lanche.price = this.calcPreco(lanche);
      });
      this.setState({
        lanches: lanches.concat(lanchesApi),
        loading: false
      });
    });
  }

  setIngredients = async () => {
    const response = await api.get("ingredientes");

    this.setState({ ingredientes: response.data || {} });
  };

  getIngredients = async lanche => {
    const lancheIngredientes = [];
    const { ingredientes } = this.state;

    ingredientes.forEach(ingrediente => {
      if (
        lanche.description
          .toLowerCase()
          .match(ingrediente.title.toLowerCase()) != null
      )
        lancheIngredientes.push(ingrediente.id);
    });

    return lancheIngredientes;
  };

  calcPreco = lanche => {
    const { ingredientes } = this.state;
    let total = 0;
    ingredientes.map(ingrediente => {
      if (
        lanche.description
          .toLowerCase()
          .match(ingrediente.title.toLowerCase()) != null
      ) {
        total += ingrediente.price;
      }
    });

    return total;
  };

  selecionaLanche = async lanche => {
    const { navigation } = this.props;
    lanche.ingredientes = await this.getIngredients(lanche);
    navigation.navigate("Detalhes", { lanche });
  };

  closeDetails = () => {
    this.setState({ modalVisible: false });
  };

  renderItem = ({ item }) => (
    <Item
      key={item.id}
      title={item.title}
      description={item.description}
      price={item.price}
      icon={null}
      onClick={() => this.selecionaLanche(item)}
    />
  );

  renderItemSeparator = () => <View style={styles.itemSeparator} />;

  renderActivityIndicator = () => (
    <ActivityIndicator size="small" color="#f4511e" />
  );

  renderList = () => {
    const { lanches } = this.state;
    return (
      <FlatList
        style={styles.flatList}
        data={lanches}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparator}
        keyExtractor={lanche => `${lanche.id}`}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        {loading ? this.renderActivityIndicator() : this.renderList()}
      </View>
    );
  }
}
