let selectType = (type: any , index: any) => {
  let iSmallUpperBound = 0;
  let iLargeLowerBound = 0;
  let sTypes = type.toUpperCase();
  switch (sTypes) {
    case 'PK10':
      iSmallUpperBound = 4;
      iLargeLowerBound = 5;
      break;
    case 'SSC':
      iSmallUpperBound = 4;
      iLargeLowerBound = 5;
      break;
    case 'KL8':
      iSmallUpperBound = 40;
      iLargeLowerBound = 41;
      break;
    case 'KLSF':
      iSmallUpperBound = 83;
      iLargeLowerBound = 85;
      break;
    case 'K3':
      iSmallUpperBound = 3;
      iLargeLowerBound = 4;
      break;
    case 'SIX':
      iSmallUpperBound = 24;
      iLargeLowerBound = 25;
      break;
    default:
      // code block
  }
  if ( index === undefined ) {
    switch (sTypes) {
      case 'PK10':
        iSmallUpperBound = 22;
        iLargeLowerBound = 23;
        break;
      case 'SSC':
        iSmallUpperBound = 29;
        iLargeLowerBound = 30;
        break;
      case 'KL8':
        iSmallUpperBound = 809;
        iLargeLowerBound = 811;
        break;
      case 'KLSF':
        iSmallUpperBound = 83;
        iLargeLowerBound = 85;
        break;
      case 'K3':
        iSmallUpperBound = 10;
        iLargeLowerBound = 11;
        break;
      case 'SIX':
        iSmallUpperBound = 174;
        iLargeLowerBound = 175;
        break;
      default:
        // code block
    }
  }
  return [ iSmallUpperBound , iLargeLowerBound ];
};

export default selectType;

