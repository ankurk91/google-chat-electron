module.exports.replace = (str, patterns) => {
  Object.keys(patterns).forEach(function (pattern) {
    let matcher = new RegExp('{{' + pattern + '}}', 'g');
    str = str.replace(matcher, patterns[pattern]);
  });
  return str;
};
