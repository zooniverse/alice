import { config } from './config'


describe('config', (): void => {
  const { location } = window

  beforeAll((): void => {
    delete window.location
    window.location = {
      href: '?env=production'
    }
  })

  afterAll((): void => {
      window.location = location;
  });

  it('should find the browser location', function () {
    console.log(window.location);
    expect(config.tove).toBe('https://tove.zooniverse.org')
  })

  it('should find the default location', function () {
  })

  it('should throw an error with an invalid location', function () {

  })
})
