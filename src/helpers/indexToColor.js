function indexToColor(index) {
  switch (index) {
    case 0:
      // yellow
      return '#FFFF00';
    case 1:
      // green
      return '#02FE81';
    case 2:
      // pink
      return '#FF327B';
    case 3:
      // blue
      return '#2967FF';
    case 4:
      // orange
      return '#FF6600';
    case 5:
      // red
      return '#FF0000';
    case 6:
      // purple
      return '#6600FF';
    case 7:
      // red-orange
      return '#FF4500';
    case 8:
      // yellow-orange
      return '#F8D568';
    case 9:
      // yellow-green
      return '#9ACD32';
    case 10:
      // blue-green
      return '#0D98BA';
    case 11:
      // blue-violet
      return '#8A2BE2';
    case 12:
      // red-violet
      return '#C71585';
    default:
      // black
      return '#000000';
  }
}

export default indexToColor
