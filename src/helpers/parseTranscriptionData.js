function constructCoordinates(line) {
  const points = [];
  if (line && line.clusters_x && line.clusters_y) {
    line.clusters_x.forEach((point, i) => {
      points.push({ x: line.clusters_x[i], y: line.clusters_y[i] });
    })
  }
  return points;
};

function constructCoordinatesFromExtract(line) {
  const points = [];
  // console.log('extract', line);
  if (line.points && line.points.x && line.points.y) {
    line.points.x.forEach((point, i) => {
      const coords = []
      coords.push({ x: line.points.x[i][0], y: line.points.y[i][0] });
      coords.push({ x: line.points.x[i][1], y: line.points.y[i][1] });
      points.push(coords)
    })
  }
  return points;
};

function constructText(line) {
  const sentences = [];
  if (line && line.clusters_text) {
    line.clusters_text.forEach((value) => {
      value.forEach((word, i) => {
        if (!sentences[i]) { sentences[i] = []; }
        if (word && word.length) { sentences[i].push(word); }
      })
    });
  }
  return sentences.map(value => value.join(' '));
}

export { constructCoordinates, constructCoordinatesFromExtract, constructText };
