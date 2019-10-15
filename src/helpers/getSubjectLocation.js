const READABLE_FORMATS = {
  image: ['jpeg', 'png', 'svg+xml', 'gif'],
};

function getSubjectLocation(subject) {
  let locations = []

  subject.locations.forEach((location) => {
    Object.keys(location).forEach((mimeType) => {
      const src = location[mimeType]
      const [type, format] = mimeType.split('/');
      const extensions = type || [];
      if (type in READABLE_FORMATS && READABLE_FORMATS[extensions].includes(format)) {
        locations.push(src);
      }
    })
  })
  return locations
}

export {
  getSubjectLocation
};
