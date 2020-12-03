let currentToken = null;
let currentAttribute = null;
let tokenArr=[];

function emit(token) {
  console.log(token);
}
const EOF = Symbol('EOF');


function data(c) {
  if (c == '<')
    return tagOpen;
  else if (c == EOF) {
    emit({
      type: 'EOF'
    });
    return;
  } else {
    emit({
      type: 'data',
      content: c
    });
    return data;
  }
}

function tagOpen(c) {
  if (c == '/')
    return endTagOpen;
  else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    };
    return tagName(c);
  } else
    return;
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    };
    return tagName(c);
  } else if (c == '>') {} else if (c == EOF)
    return;
  else {}
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/))
    return beforeAttributeName;
  else if (c == '/')
    return selfCloseingStartTag;
  else if (c.match(/^[a-zA-z]/)) {
    currentToken.tagName += c;
    return tagName;
  } else if (c == '>')
    return data;
  else
    return tagName;
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if (c == '=') {} else {
    currentAttribute = {
      name: '',
      value: ''
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
    return afterAttributeName(c);
  } else if (c == '=') {
    return beforeAttributeValue;
  } else if (c == '\u0000') {} else if (c == "\"" || c == '>' || c == "'") {} else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function afterAttributeName(c) {

}

function beforeAttributeValue(c) {
  if (c.match(/^[\n\f\t ]$/) || c == '/' || c == '>' || c == EOF) {
    return beforeAttributeValue;
  } else if (c == "\"") {
    return doubleQuotedAttributeValue;
  } else if (c == "'") {
    return singleQuotedAttributeValue;
  } else if (c == '>') {} else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == "\"") {
    currentAttribute[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == '\u0000') {} else if (c == EOF) {} else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleQuotedAttributeValue(c) {
  if (c == "\'") {
    currentAttribute[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == '\u0000') {} else if (c == EOF) {} else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }

}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\n\f\t ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return singleQuotedAttributeValue;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {} else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\n\f\t ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfCloseingStartTag;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == '\u0000') {} else if (c == "\"" || c == "\'" || c == "<" || c == '`' || c == '=') {
  } else if (c == EOF) {} else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\n\t\f ]$/)) {
    return afterAttributeName;
  } else if (c == '/') {
    return selfCloseingStartTag;
  } else if (c == '=') {
    return beforeAttributeName;
  } else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {} else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: ''
    };
    return attributeName(c);
  }
}

function selfCloseingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    return data;
  } else if (c == EOF)
    return;
  else {}
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
};