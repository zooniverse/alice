const SLOPE_BUFFER = 10;

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

  reduction.user_ids.forEach((userId, idIndex) => {
    // lets find that user's annotation
    const userClassificationsOnSubject = extractsByUser[userId]
    for (let i = 0; i < userClassificationsOnSubject.length; i++) {
      const classification = userClassificationsOnSubject[i]
      const currentFrame = `frame${subjectIndex}`
      if (classification[currentFrame]) {
        // Get the extract_index value at this user_id index
        // this tells you which extract index to consider
        const extractIndex = reduction.extract_index[idIndex]
        // check this classification at that index
        const text = classification[currentFrame].text[extractIndex]
        const points = classification[currentFrame].points

        // check slope is similar to reduction
        const extractSlope = classification[currentFrame].slope[extractIndex]
        const reductionSlope = reduction.line_slope
        const similarSlope = Math.abs(Math.abs(extractSlope) - Math.abs(reductionSlope)) < SLOPE_BUFFER

        const isMatch = text && text[0] === reductionText[reductionIndex][idIndex]
        // see if that text exists and if it matches the reductionText
        if (isMatch && similarSlope) {
          const lastIndex = points.x[extractIndex].length - 1
          result.push({
            userId,
            text: text[0],
            slope: classification[currentFrame].slope[extractIndex],
            x1: points.x[extractIndex][0],
            x2: points.x[extractIndex][lastIndex],
            y1: points.y[extractIndex][0],
            y2: points.y[extractIndex][lastIndex]
          })
          break;
        }
      }
    }
  })
  return result
}

export {
  constructCoordinates,
  constructText,
  mapExtractsToReductions
};
