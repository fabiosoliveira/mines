import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import params from './params';

export default (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o Mines!</Text>
      <Text style={styles.instructions}>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  welcome: {},
  instructions: {},
});
