export default function constructText(line) {
  const sentences = []
  line.clusters_text.forEach((value) => {
    value.forEach((word, i) => {
      if (!sentences[i]) { sentences[i] = []; }
      if (word && word.length) { sentences[i].push(word); }
    })
  });
  return sentences.map(value => value.join(' '))
}
