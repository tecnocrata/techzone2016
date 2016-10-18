'use strict'

function sleep(time, work) {
  return new Promise(r => {
    setTimeout(function () {
      let result = null;
      if (work)
        result = work();
      r(result);
    }, time);
  })
}

exports.sleep = sleep;