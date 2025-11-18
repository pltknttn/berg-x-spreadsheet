const expr = '(9+(3-1))*(2+3)+4/2';

const parse = (src) => {
  const operatorStack = [];
  const stack = [];
  let subStrs = [];
  let oldc = '';

  for (let i = 0; i < src.length; i += 1) {
    const c = src.charAt(i);
    if (c !== ' ') {
      if (c >= '0' && c <= '9') {
        subStrs.push(c);
      } else if (c === '(') {
        if (subStrs.length > 0) {
          operatorStack.push(subStrs.join(''));
        }
        operatorStack.push('(');
        subStrs = [];
      } else if (c === ')') {
        if (subStrs.length > 0) {
          stack.push(subStrs.join(''));
        }
        subStrs = [];
        let c1 = operatorStack.pop();
        while (c1 !== '(') {
          stack.push(c1);
          if (operatorStack.length <= 0) break;
          c1 = operatorStack.pop();
        }
      } else {
        if (subStrs.length > 0) {
          stack.push(subStrs.join(''));
        }
        subStrs = [];
        // priority: */ > +-
        // console.log('xxxx:', operatorStack, c, stack);
        if (operatorStack.length > 0 && (c === '+' || c === '-')) {
          let top = operatorStack[operatorStack.length - 1];
          if (top !== '(') stack.push(operatorStack.pop());
          if (top === '*' || top === '/') {
            while (operatorStack.length > 0) {
              top = operatorStack[operatorStack.length - 1];
              if (top !== '(') stack.push(operatorStack.pop());
              else break;
            }
          }
        } else if (operatorStack.length > 0) {
          const top = operatorStack[operatorStack.length - 1];
          if (top === '*' || top === '/') stack.push(operatorStack.pop());
        }
        operatorStack.push(c);
      }
      oldc = c;
    }
  }
  if (subStrs.length > 0) stack.push(subStrs.join(''));
  while (operatorStack.length > 0) stack.push(operatorStack.pop());
  return stack;
};

console.log('expr:', expr);
console.log('result:', parse(expr).join(''));
console.log(parse(expr));
