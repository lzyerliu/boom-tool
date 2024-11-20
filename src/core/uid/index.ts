
export const uid = (len: number) => {
  let IDX: number = 256, HEX: any[] = [], SIZE: number = 256, BUFFER: any;
  while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

  let i = 0, tmp = (len || 11);
  if (!BUFFER || ((IDX + tmp) > (SIZE * 2))) {
    for (BUFFER = '', IDX = 0; i < SIZE; i++) {
      BUFFER += HEX[Math.random() * 256 | 0];
    }
  }
  return BUFFER.substring(IDX, IDX++ + tmp);
}
