function indexToColor(index) {
  switch (index) {
    case 0:
      return '#FFFF00';
    case 1:
      return '#02FE81';
    case 2:
      return '#FF327B';
    case 3:
      return '#2967FF';
    case 4:
      return '#E45950';
    case 5:
      return '#800080';
    default:
      return '#00FFFF';
  }
}

export default indexToColor
