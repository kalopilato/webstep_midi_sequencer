import { TOTAL_STEPS } from '../constants';

export function initialisedGrid() {
  return buildColumns(() => { return false; });
}

export function randomisedGrid() {
  return buildColumns(() => { return Math.random() < 0.1; });
}

var buildColumns = (defaultButtonStatus) => {
  var columns = [];
  for(let col = 0; col < TOTAL_STEPS; col++){
    var column = [];
    for(let row = 0; row < 8; row++){
      column.push({
        active: defaultButtonStatus(),
        row,
        col
      })
    }
    columns.push(column);
  }
  return columns;
}
