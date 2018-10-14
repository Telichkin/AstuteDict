module.exports = function (items) {
  var variables = /\*|{([^{}]+)}/g;
  var specialCharacters = /[-[\]()\\+?.^$|\s]/g;
  var regexpStrings = [];
  var pathPatternsAndVariablesNames = [null];

  Object.keys(items).forEach(function (key) {
    var pathDescription = {value: items[key], argsNumber: 0};
    pathPatternsAndVariablesNames.push(pathDescription);

    var match;
    while (match = variables.exec(key)) {
      if (match[1]) { pathDescription.argsNumber += 1 }
      pathPatternsAndVariablesNames.push(match[1]);
    }

    regexpStrings.push('(' + key.replace(specialCharacters, '\\$&').replace(variables, '(.*)') + '$)');
  });

  var regexp = new RegExp(regexpStrings.join('|'));

  function get(aKey) {
    var variables = {};
    var foundKeyParts = (aKey.match(regexp) || []);
    var descriptionIndex = foundKeyParts.indexOf(foundKeyParts[0], 1);
    var description = pathPatternsAndVariablesNames[descriptionIndex] || {value: undefined, argsNumber: 0};

    for (var i = 1; i <= description.argsNumber; i++) {
      variables[pathPatternsAndVariablesNames[descriptionIndex + i]] = foundKeyParts[descriptionIndex + i];
    }

    return {value: description.value, variables: variables};
  }

  return {get: get};
}