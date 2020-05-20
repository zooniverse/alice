export default function mockJWT(mockClient) {
  return Object.assign({ jwt: () => {} }, mockClient)
}
