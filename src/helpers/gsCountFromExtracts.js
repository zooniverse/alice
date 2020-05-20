export default function gsCountFromExtracts(extracts) {
  let count = 0;
  extracts.forEach(extract => {
    const values = Object.values(extract.data)
    const isGoldStandard = values.some(data => data.gold_standard)
    if (isGoldStandard) count++
  })
  return count;
}
