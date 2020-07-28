import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

import params from './params';
import MineField from './components/MineField';
import {
  createMinedBoard,
  cloneBoard,
  openField,
  showMines,
  wonGame,
  hadExplosion,
} from './logics';

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
  const [board, setBoard] = useState(createState());
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  function onOpenField(row, column) {
    const _board = cloneBoard(board);
    openField(_board, row, column);
    const _lost = hadExplosion(_board);
    const _won = wonGame(_board);

    if (_lost) {
      showMines(_board);
      Alert.alert('Perdeeeeu!', 'Que Buuuuurro!');
    }

    if (_won) {
      Alert.alert('Parabéns', 'Você vençeu!');
    }

    setBoard(_board);
    setWon(_won);
    setLost(_lost);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o Mines!</Text>
      <Text style={styles.instructions}>
        Tamanho da grade:
        {params.getRowsAmount()}x{params.getColumnsAmount()}
      </Text>

      <View style={styles.board}>
        <MineField board={board} onOpenField={onOpenField} />
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
