'use strict'

function sleep(time, work) {
  return new Promise(r => {
    setTimeout(function () {
      if (work)
        work();
      r();
    }, time);
  })
}

exports.sleep = sleep;