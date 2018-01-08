/*
* Copyright (c) 2018 Karina Yeznaian
* Released under the MIT license
* original here: https://codepen.io/BoyWithSilverWings/pen/MJgQqR
* forked by @karina-y
* forked github: https://github.com/karina-y/mostInViewport
* forked example usage here: https://codepen.io/karinay/pen/Eoodvp?editors=1010
*/


//viewport checker
//takes array of elements
//returns the one who is most in the viewport
$.fn.mostInViewport = function() {

  var mostInViewportItemHeight = 0;
  var mostInViewportItem;
  var items = this;

  //loop through each element
  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    //element's points on the page
    var eTop = $(item).offset().top;
    var eBtm = eTop + $(item).outerHeight();

    //viewport's points on the page
    var vpTop = $(window).scrollTop();
    var vpBtm = vpTop + $(window).height();

    //is the element within our viewport? partial is acceptable
    var isInViewport = eBtm > vpTop && eTop < vpBtm;

    //pixels height of the element in viewport, ie elem could be 500px tall but only 200 of those pixels are within the viewport ////in this case we'd heightInViewport would be 200
    var heightInViewport = 0;

    //get heightInViewport
    if (isInViewport) {
      //where is the element on our page?
      var eIsAtTop = eTop <= vpTop ? true : false;

      //element is at the top portion of the page
      if (eIsAtTop) {
        heightInViewport = eBtm - vpTop;
      }
      //element is at the bottom portion of the page
      else {
        heightInViewport = vpBtm - eTop;
      }

      //reevaluating which of these divs is taking up the most space in our viewport
      if (heightInViewport > mostInViewportItemHeight) {
        mostInViewportItem = item;
        mostInViewportItemHeight = heightInViewport;
      }
      //rare case but might as well check for it
      else if (heightInViewport === mostInViewportItemHeight) {

        //if this is the case we'll take the div higher on the page, switch the < to > to take the one lower on the page
        if (eIsAtTop && (eTop < $(mostInViewportItem).offset().top)) {
          mostInViewportItem = item;
          mostInViewportItemHeight = heightInViewport;
        }
      }
    }
  }

  return mostInViewportItem;

};
