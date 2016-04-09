function draculaLSTM(values, prefix) {

  // Basically a 2D version of what's in nn_lstm.py

  prefix = 'draculaParams_'+prefix;
  var U = window[prefix+'_U'];
  var W = window[prefix+'_W'];
  var b = window[prefix+'_b'];

  var sigmoid = function(t) {
    return numeric.div(1,
      numeric.add(1,
        numeric.exp(
          numeric.sub(0, t)
        )
      )
    );
  }

  var slice = function(x_, n, dim) {
    var ret = [];
    for (var i = n*dim; i < (n+1)*dim; i++) {
      ret.push(x_[i]);
    }
    return ret;
  }

  var tanh = function(x) {
    var p = numeric.exp(numeric.mul(-2, x));
    return numeric.div (
      numeric.sub(1, p),
      numeric.add(1, p)
    )
  }

  // Compute the state below (tensor dot of V, W and then +b)
  var stateBelow = numeric.dot(values, W)
  for (var i = 0; i < stateBelow.length; i++) {
    stateBelow[i] = numeric.add(stateBelow[i], b)
  }

  var h_ = new Array(64).fill(0);
  var c_ = new Array(64).fill(0);
  var ret = [];
  for (var token = 0; token < values.length; token++) {
    // Compute input gate values
    var x_ = stateBelow[token];
    var preact = numeric.dot(h_, U);
    preact = numeric.add(preact, x_);

    // Internal cells
    var i = sigmoid(slice(preact, 0, 64));
    var f = sigmoid(slice(preact, 1, 64));
    var o = sigmoid(slice(preact, 2, 64));
    var c = tanh(slice(preact, 3, 64));

    c = numeric.add(numeric.mul(f, c_), numeric.mul(i, c))
    h = numeric.mul(o, tanh(c))

    h_ = h
    c_ = c
    ret.push(h)
  }

  return ret;

}

function draculaBLSTM(values, prefix) {

  var fwPrefix = prefix + '_forwards';
  var bkPrefix = prefix + '_backwards';

  var forwards = draculaLSTM(values, fwPrefix);
  var backwards = draculaLSTM(values, bkPrefix);

  return numeric.add(forwards, backwards);
}
