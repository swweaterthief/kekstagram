function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
}

// eslint-disable-next-line no-console
console.log(checkStringLength('проверяемая строка', 20));
// eslint-disable-next-line no-console
console.log(checkPalindrome('топот'));
