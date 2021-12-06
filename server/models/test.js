function isBalanced(s, caps) {
  let arr = [];
  console.log(s);
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(":
        arr.push(s[i]);
        break;
      case ")":
        arr.push(s[i]);
        break;
      case "[":
        arr.push(s[i]);
        break;
      case "]":
        arr.push(s[i]);
        break;
      case "-":
        arr.push(s[i]);
        break;
      case "@":
        arr.push(s[i]);
        break;
      case "{":
        arr.push(s[i]);
        break;
      case "}":
        arr.push(s[i]);
        break;
    }
  }
  let balanced = false;
  if (arr.length % 2 === 0) {
    for (let n = 0; n < arr.length / 2; n++) {
      switch (arr[n]) {
        case "(":
          arr[arr.length - 1 - n] === ")" ? (balanced = true) : (balanced = false);
          break;
        case ")":
          arr[arr.length - 1 - n] === "(" ? (balanced = true) : (balanced = false);
          break;
        case "[":
          arr[arr.length - 1 - n] === "]" ? (balanced = true) : (balanced = false);
          break;
        case "]":
          arr[arr.length - 1 - n] === "[" ? (balanced = true) : (balanced = false);
          break;
        case "-":
          arr[arr.length - 1 - n] == "-" ? (balanced = true) : (balanced = false);
          break;
        case "{":
          arr[arr.length - 1 - n] == "}" ? (balanced = true) : (balanced = false);
          break;
        case "@":
          arr[arr.length - 1 - n] == "@" ? (balanced = true) : (balanced = false);
          break;
      }
    }
    if (arr.length === 0) {
      console.log(arr.length);
      balanced = true;
    }
  }
  return balanced;
}
