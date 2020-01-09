function indexToRaindow(index) {
  switch (index) {
    case 0:
      // red
      return '#D0021B';
    case 1:
      // orange
      return '#F5A623';
    case 2:
      // yellow
      return '#F8E71C';
    case 3:
      // light-green
      return '#7ED321';
    case 4:
      // green
      return '#417505';
    case 5:
      // blue
      return '#4A90E2';
    case 6:
      // pink
      return '#BD10E0';
    case 7:
      // cyan
      return '#50E3C2';
    case 8:
      // avocado
      return '#B8E986';
    case 9:
      // coral
      return '#D06F7B';
    case 10:
      // brown
      return '#795315';
    default:
      // black
      return '#000000';
  }
}

export default indexToRaindow
