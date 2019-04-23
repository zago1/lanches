import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import * as DetalhesActions from '../../store/actions/detalhes';

import Ingredient from '../../components/Ingredient';
import Promocao from '../../components/Promocao';

import { convertFloatToBRLCurrency } from '../../helpers';

import { pop } from '../../services/navigation';

import styles from './styles';

class Detalhes extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Lanche selecionado'),
    headerTintColor: '#F1F1F1',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  });

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
    total: PropTypes.number.isRequired,
    promocao: PropTypes.shape({
      light: PropTypes.bool,
      carne: PropTypes.bool,
      queijo: PropTypes.bool,
    }).isRequired,
    ingredientes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    lanche: PropTypes.shape({
      title: PropTypes.string.isRequired,
      ingredientes: PropTypes.arrayOf(PropTypes.number).isRequired,
      price: PropTypes.number,
    }).isRequired,
    ingredientesCalc: PropTypes.func.isRequired,
    ingredientesUpdateQttyRequest: PropTypes.func.isRequired,
    detalhes: PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    const { navigation, lanche } = this.props;
    navigation.setParams({ title: lanche.title });
  }

  componentDidMount() {
    const { ingredientesCalc } = this.props;
    ingredientesCalc();
    // this.calcIngredientes(lanche);
  }

  add = (id) => {
    const { ingredientes, ingredientesUpdateQttyRequest } = this.props;
    ingredientes[ingredientes.findIndex(ingrediente => ingrediente.id === id)].qtty += 1;

    ingredientesUpdateQttyRequest(ingredientes);
  };

  remove = (id) => {
    const { ingredientes, ingredientesUpdateQttyRequest } = this.props;
    const index = ingredientes.findIndex(ingrediente => ingrediente.id === id);

    if (ingredientes[index].qtty > 0) {
      ingredientes[index].qtty -= 1;
    }

    ingredientesUpdateQttyRequest(ingredientes);
  };

  addLanche = () => {
    Alert.alert('Sucesso!', 'Seu pedido foi realizado!');
    pop();
  };

  renderItem = ({ item }) => (
    <Ingredient
      key={item.id}
      title={item.title}
      price={item.price}
      qtty={item.qtty}
      add={() => this.add(item.id)}
      remove={() => this.remove(item.id)}
    />
  );

  renderItemSeparator = () => <View style={styles.itemSeparator} />;

  renderActivityIndicator = () => <ActivityIndicator size="small" color="#f4511e" />;

  render() {
    const {
      total, ingredientes, promocao, detalhes,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.renderViewContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View>
              <FlatList
                extraData={detalhes}
                ItemSeparatorComponent={this.renderItemSeparator}
                keyExtractor={item => `${item.id}`}
                style={styles.flatList}
                data={ingredientes}
                renderItem={this.renderItem}
              />
            </View>
            <View>
              <Promocao carne={promocao.carne} queijo={promocao.queijo} light={promocao.light} />
            </View>
          </ScrollView>
          <View style={styles.totalContainer}>
            <TouchableOpacity style={styles.addButton} onPress={this.addLanche}>
              <Text style={styles.totalText}>
                {`Finalizar ${convertFloatToBRLCurrency(total)}`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  detalhes: state.detalhes,
  lanche: state.lanches.selectedLanche,
  ingredientes: state.detalhes.ingredientes,
  promocao: state.detalhes.promocao,
  total: state.detalhes.total,
});

const mapDispatchToProps = dispatch => bindActionCreators(DetalhesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detalhes);
