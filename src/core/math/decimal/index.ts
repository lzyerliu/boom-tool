export type ComputeType = '+' | '-' | '*' | '/';

export type DecimalCompute = (type: ComputeType, ...args: number[]) => {
  result: number;
  next: DecimalCompute;
}

/**
 * 计算
 * @param type ComputeType
 * @param args 0.1  0.2
 * @returns 
 */
export const decimalCompute: DecimalCompute = (type, ...args) => {

  // 计算放大倍数
  const getPower = (numbers: number[]) => {
    const lens = numbers.map(num => num.toString().split('.')[1]?.length || 0);
    // 获取最大长度
    const len = Math.max(...lens);
    // 返回放大倍数
    return Math.pow(10, len);
  };

  // 放大倍数
  const power = getPower(args);

  const bigNumbers = args.map(num => Math.round(num * power));

  let result = 0;

  switch (type) {
    case '+':
      result = bigNumbers.reduce((preNum, nextNum) => preNum + nextNum, result) / power;
      break;
    case '-':
      result = bigNumbers.reduce((preNum, nextNum) => preNum - nextNum) / power;
      break;
    case '*':
      const times = power ** bigNumbers.length;
      result = bigNumbers.reduce((preNum, nextNum) => preNum * nextNum) / times;
      break;
    case '/':
      result = bigNumbers.reduce((preNum, nextNum) => preNum / nextNum);
      break;
  }

  return {
    result,
    next: (nextType, ...nextArgs) => decimalCompute(nextType, result, ...nextArgs)
  };
}
