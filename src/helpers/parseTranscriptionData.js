function constructCoordinates(line) {
  const points = [];

  if (line && line.clusters_x && line.clusters_y) {
    points.push({
      x1: line.clusters_x[0],
      x2: line.clusters_x[1],
      y1: line.clusters_y[0],
      y2: line.clusters_y[1]
    })
  }
  return points;
};

function constructCoordinatesFromExtract(line, user) {
  const points = [];
  if (line.points && line.points.x && line.points.y) {
    line.points.x.forEach((point, i) => {
      const coords = []
      coords.push({ x: line.points.x[i][0], y: line.points.y[i][0] });
      coords.push({ x: line.points.x[i][1], y: line.points.y[i][1] });
      points.push(coords)
    })
  }
  return { points, user };
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
