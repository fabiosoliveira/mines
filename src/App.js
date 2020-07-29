import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

import params from './params';
import MineField from './components/MineField';
import Header from './components/Header';

import {
  createMinedBoard,
  cloneBoard,
  openField,
  showMines,
  wonGame,
  hadExplosion,
  invertFlag,
  flagsUsed,
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

  function onSelectField(row, column) {
    const _board = cloneBoard(board);
    invertFlag(_board, row, column);
    const _won = wonGame(_board);

    if (_won) {
      Alert.alert('Parabéns', 'Você vençeu!');
    }

    setBoard(_board);
    setWon(_won);
  }

  return (
    <View style={styles.container}>
      <Header
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => {
          setBoard(createState());
          setLost(false);
          setWon(false);
        }}
      />

      <View style={styles.board}>
        <MineField
          board={board}
          onOpenField={onOpenField}
          onSelectField={onSelectField}
        />
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
