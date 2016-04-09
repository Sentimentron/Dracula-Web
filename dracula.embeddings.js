function draculaGetEmbeddings(word) {
  // Assumes dracula.params.js is included beforehand
  var ret = [];
  for (var i = 0; i < word.length; i++) {
    var character = word[i]
    // Check that the character is defined in the parameters
    var isAvailable = character in char_dict
    // If not, substitute with zero character
    if (!isAvailable) character = 0
    else {
      character = char_dict[character];
    }
    ret.push(Cemb[character]);
  }
  return ret;
}
