export class NumUtil {
  public static toFixed(num, fixed) {
    if (!num) {
      return 0;
    }
    const result = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return parseFloat(num.toString().match(result)[0]);
  }

  public static addNumbers(num1: number, num2: number) {
    return (num1 * 100 + num2 * 100) / 100;
  }

  public static subtractNumbers(num1: number, num2: number) {
    return (num1 * 100 - num2 * 100) / 100;
  }
}
