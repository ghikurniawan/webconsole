document.addEventListener('DOMContentLoaded', function() {

  var typed = new Typed("#typed", {
    strings: [
      `Hi, I'm Iwan Kurniawan:^1000 I'm <strong>Graphic Design</strong>^300`, 
      `Hi, I'm Iwan Kurniawan:^1000 <strong>Web Developer</strong>^00`, 
      `Hi, I'm Iwan Kurniawan:^1000 <strong>Frelancer</strong>^200`, 
      `Hi, I'm Iwan Kurniawan:^1000 and <strong>More...</strong>^300`,
      `Do you see the stars?^1000\ndoes it look so beautiful? ^1000\n \nStars can't <strong>Shine</strong> <i>without</i> <strong>Darkness</strong>. . .^1000\nthat's the reason why this page is <strong>Dark</strong>. .`


    ],
    typeSpeed: 40,
    backSpeed: 0,
    backDelay: 500,
    startDelay: 1000,
    loop: false,
    onBegin: function(self) { prettyLog('onBegin ' + self) },
    onComplete: function(self) { prettyLog('onCmplete ' + self) },
    preStringTyped: function(pos, self) { prettyLog('preStringTyped ' + pos + ' ' + self); },
    onStringTyped: function(pos, self) { prettyLog('onStringTyped ' + pos + ' ' + self) },
    onLastStringBackspaced: function(self) { prettyLog('onLastStringBackspaced ' + self) },
    onTypingPaused: function(pos, self) { prettyLog('onTypingPaused ' + pos + ' ' + self) },
    onTypingResumed: function(pos, self) { prettyLog('onTypingResumed ' + pos + ' ' + self) },
    onReset: function(self) { prettyLog('onReset ' + self) },
    onStop: function(pos, self) { prettyLog('onStop ' + pos + ' ' + self) },
    onStart: function(pos, self) { prettyLog('onStart ' + pos + ' ' + self) },
    onDestroy: function(self) { prettyLog('onDestroy ' + self) }
  });


  function prettyLog(str) {
    console.log('%c ' + str, 'color: green; font-weight: bold;');
  }

});