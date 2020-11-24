{
  const findStr = (str, word) => {
    if (typeof str !== 'string' || typeof word !== 'string')
      return 'str or word is not a string';
    // if (str.length <= 10) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === word) {
        return `this word at str ${i+1} index`;
      }
      // }
    }

    // console.log(str.indexOf(word));

    return `this string not find this word`;
  };
  console.log(findStr('123', '3'));
}

//老师的办法
{
  function match(string) {
    for (let c of string) {
      if (c == 'a')
        return true;
    }
    return false;
  }

  match('i am groot');
}
/* 在一个字符串中找到字符串AB */
{


}
