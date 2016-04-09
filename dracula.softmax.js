function draculaSoftmax(values) {

  // TODO: need to check if this U is the same as the one exported
  var act = numeric.dot(values, draculaParams_U);
  for (var i = 0; i < act.length; i++) {
    act[i] = numeric.add(act[i], draculaParams_b);
  }

  var exp = numeric.exp(act);
  for (var i = 0; i < act.length; i++) {
    exp[i] = numeric.div(exp[i], numeric.sum(exp[i]));
  }

  // Compute the argmax
  var ret = [];
  for (var i = 0; i < act.length; i++) {
    var argMax = 0;
    var argMaxVal = 0;
    for (var j = 0; j < exp[i].length; j++) {
      var v = exp[i][j];
      if (v > argMaxVal) {
        argMax = j;
        argMaxVal = v;
      }
    }
    if (argMax == 0) break;
    ret.push(draculaParams_inv_pos_dict[argMax]);
  }

  return ret; // TODO: fix me

}
