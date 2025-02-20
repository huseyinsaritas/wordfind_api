export const randomId = (maxId: number): number => {
  return Math.floor(Math.random() * (maxId + 1));
};
