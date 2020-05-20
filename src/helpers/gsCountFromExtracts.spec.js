import gsCountFromExtracts from './gsCountFromExtracts'

const gsExtract = {
  data: {
    frame0: { gold_standard: true }
  }
}

const extract = {
  data: {
    frame0: { gold_standard: false }
  }
}

const gsExtracts = new Map()
gsExtracts.set('one', gsExtract)
gsExtracts.set('two', gsExtract)
gsExtracts.set('three', extract)

const extracts = new Map()
extracts.set('one', extract)
extracts.set('two', extract)

console.log(gsExtracts);
console.log(extracts);

describe('Helper > gsCountFromExtracts', function () {
  it('should count the amount of Gold Standard extracts', function () {
    const result = gsCountFromExtracts(gsExtracts)
    expect(result).toBe(2)
  })

  it('should return zero when no Gold Standard extracts', function () {
    const result = gsCountFromExtracts(extracts)
    expect(result).toBe(0)
  })
})
