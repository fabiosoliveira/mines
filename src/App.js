import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import params from './params';
import MineField from './components/MineField';
import {createMinedBoard} from './logics';

function minesAmount() {
  const cols = params.getColumnsAmount();
  const rows = params.getRowsAmount();
  return Math.ceil(cols * rows * params.difficultLevel);
}

function createState() {
  const cols = params.getColumnsAmount();
  const rows = params.getRowsAmount();
  return createMinedBoard(rows, cols, minesAmount());
}

export default (props) => {
  const board = createState();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o Mines!</Text>
      <Text style={styles.instructions}>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View style={styles.board}>
        <MineField board={board} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
  welcome: {},
  instructions: {},
});
