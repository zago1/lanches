import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import Item from '../../components/Item';

import * as LanchesActions from '../../store/actions/lanches';

import styles from './styles';

class Lanches extends Component {
  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    lanches: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    ingredientes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loading: PropTypes.bool.isRequired,
    lanchesRequest: PropTypes.func.isRequired,
    lancheSelect: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { lanchesRequest } = this.props;

    lanchesRequest();
  }

  getIngredients = async (lanche) => {
    const lancheIngredientes = [];
    const { ingredientes } = this.props;

    ingredientes.forEach((ingrediente) => {
      if (
        lanche.description
          .toLowerCase()
          .toLowerCase()
          .match(ingrediente.title.toLowerCase()) != null
      ) {
        lancheIngredientes.push(ingrediente.id);
      }
    });

    return lancheIngredientes;
  };

  selecionaLanche = async (lanche) => {
    const { lancheSelect } = this.props;
    const ingredientes = await this.getIngredients(lanche);

    lancheSelect({ ...lanche, ingredientes });
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

  renderActivityIndicator = () => <ActivityIndicator size="small" color="#f4511e" />;

  renderList = () => {
    const { lanches } = this.props;
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
    const { loading } = this.props;
    return (
      <View style={styles.container}>
        {loading ? this.renderActivityIndicator() : this.renderList()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lanches: state.lanches.data,
  loading: state.lanches.loading,
  ingredientes: state.detalhes.ingredientes,
});

const mapDispatchToProps = dispatch => bindActionCreators(LanchesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lanches);
