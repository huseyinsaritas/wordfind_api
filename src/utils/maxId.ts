export const FIVE_MAX_ID = 5568;
export const SIX_MAX_ID = 5891;
export const SEVEN_MAX_ID = 7408;

export const maxId = (len: number): number => {
  let maxId;
  switch (len) {
    case 5:
      return (maxId = FIVE_MAX_ID);
    case 6:
      return (maxId = SIX_MAX_ID);
    case 7:
      return (maxId = SEVEN_MAX_ID);
    default:
      maxId = FIVE_MAX_ID;
      break;
  }
  return maxId;
};
