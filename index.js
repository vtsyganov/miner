const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const parseData = data => {
  return data.split('\n')
    .map(line => line.trim())
    .map(line => line.split(' '));
};
const countNearbyMines = (grid, lineIdx, colIdx) => {
  const size = grid.length - 1;  
  const cells = grid.slice(Math.max(0, lineIdx - 1), Math.min(lineIdx + 1, size) + 1)
    .map(line => line.slice(Math.max(0, colIdx - 1), Math.min(colIdx + 1, size) + 1));

  return cells.reduce((acc, line) => {
    const lineSum = line.reduce((acc, cell) => {
      return cell === 'X' ? acc + 1 : acc;
    }, 0);

    return acc + lineSum;
  }, 0);
};
const processData = data => {
  const parsedMap = parseData(data);

  return parsedMap.map((line, lineIdx) => {
    return line.map((cell, colIdx) => {
      if(cell === 'X') {
        return cell;
      }
      return String(countNearbyMines(parsedMap, lineIdx, colIdx));
    });
  });
};

const request = new XMLHttpRequest();
const fileURL = 'file:///Users/vtsyganovsinput.txt'

request.open("GET", fileURL, false);
request.onreadystatechange = () => {
  if(request.readyState === 4) {
    if(request.status === 200 || request.status == 0) {
      console.log(processData(request.responseText));
    }
  }
}
request.send(null);



