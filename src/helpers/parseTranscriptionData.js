function constructCoordinates(line) {
  const points = [];
  if (line && line.clusters_x && line.clusters_y) {
    line.clusters_x.forEach((point, i) => {
      points.push({ x: line.clusters_x[i], y: line.clusters_y[i] });
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

export { constructCoordinates, constructText };
