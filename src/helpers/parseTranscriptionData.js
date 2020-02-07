function constructCoordinates(line) {
  const points = [];

  if (line && line.clusters_x && line.clusters_y) {
    const lastPoint = line.clusters_x.length - 1
    points.push({
      x1: line.clusters_x[0],
      x2: line.clusters_x[lastPoint],
      y1: line.clusters_y[0],
      y2: line.clusters_y[lastPoint]
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

function mapExtractsToReductions(
  extractsByUser = {},
  reduction = {},
  reductionIndex = 0,
  reductionText = [],
  subjectIndex = 0,
) {
  const result = []

  reduction.user_ids && reduction.user_ids.forEach((id, userIdIndex) => {
    extractsByUser[id] && extractsByUser[id].forEach(extract => {
      if (extract[`frame${subjectIndex}`]) {
        const extractLocation = extract[`frame${subjectIndex}`].text[reduction.extract_index[userIdIndex]]
        if (extractLocation && extractLocation[0] === reductionText[reductionIndex][userIdIndex]) {
          const annotationIndexToExtract = reduction.extract_index[userIdIndex]
          const points = extract[`frame${subjectIndex}`].points
          const lastIndex = points.x[annotationIndexToExtract].length - 1
          result.push({
            x1: points.x[annotationIndexToExtract][0],
            x2: points.x[annotationIndexToExtract][lastIndex],
            y1: points.y[annotationIndexToExtract][0],
            y2: points.y[annotationIndexToExtract][lastIndex]
          })
        }
      }
    })
  })

  return result
}

export {
  constructCoordinates,
  constructText,
  mapExtractsToReductions
};
