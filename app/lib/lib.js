import { TOTAL_STEPS } from '../constants';

export function initialisedGrid() {
  return buildColumns();
}

var buildColumns = () => {
  var columns = [];
  for(let i = 0; i < TOTAL_STEPS; i++){
    columns.push(buildColumn(i));
  }
  return columns;
}

var buildColumn = (col) => {
  var column = [];
  for(let i = 0; i < 8; i++){
    column.push({
      active: false,
      row: i,
      col
    })
  }
  return column;
}