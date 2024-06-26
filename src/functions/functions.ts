/* global clearInterval, console, CustomFunctions, setInterval */

window.sharedState = "empty";

/**
 * 将两个数字相加。
 * @customfunction
 * @param第一个数字
 * @param第二个 第二个数字
 * @returns 两个数字的总和。
 */
export function add(first: number, second: number): number {
  return first +second;
}

/**
 * 保存字符串到shared
 * @customfunction
 * @param sharedValue:string 写入共享区的字符串
 * @return {string} 成功的信息
 */
export function storeValue(sharedValue:string):string{
  window.sharedState = sharedValue;
  return "已保存"
}

/**
 * 将两个数字相加。
 * @customfunction
 * @param范围 第一个数字
 * @returns 两个数字的总和。
 */
export function sum(range: any[][]): number {
  let res:number=0;
  range.forEach(col => {
    col.forEach(row  => {
      if (typeof(row)==='number')
        {
          res+=row;
        }
    }); 
  });
  return res;
}

/**
 * 每秒显示一次当前时间。
 * @customfunction
 * @param调用自定义函数处理程序
 */
export function clock(invocation: CustomFunctions.StreamingInvocation<string>): void {
  const timer = setInterval(() => {
    const time = currentTime();
    invocation.setResult(time);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * 返回当前时间。
 * @returns String 具有针对当前区域设置的当前时间格式。
 */
export function currentTime(): string {
  return new Date().toLocaleTimeString();
}

/**
 * 每秒递增一次值。
 * @customfunction
 * @param incrementBy 要递增的金额
 * @param 调用自定义函数处理程序
 */
export function increment(incrementBy: number, invocation: CustomFunctions.StreamingInvocation<number>): void {
  let result = 0;
  const timer = setInterval(() => {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);

  invocation.onCanceled = () => {
    clearInterval(timer);
  };
}

/**
 * 向 console.log（） 写入消息。
 * @customfunction日志
 * @param要写入的消息字符串。
 * @returns 要写入的字符串。
 */
export function logMessage(message: string): string {
  console.log(message);
  return message;
}
