
/*================================================================================================================
// Carousel Script 
/*================================================================================================================

/* ---------------------- Carousel Class v0.1 by Alan Sutherland ---------------------------------- */

var carousel = Class.create({
    initialize: function(options) {
        this.options = {
            box           : 'containerClass',  
            slider        : 'carousel',
            controls      : 'controlsClass',
            skipnext      : 'next',
            skipprev      : 'prev',
            items         : 'dd',
            timing        : 500,
        };
        this.internal = {
          // Define the global counter, the items and the current item 
          counter: 0,
          items  : '',
          currentItem: '',
          amount: 0,
          container : '',
          slider: '',
          slideWidth: 0,
          lastSlide: '',
          lastSlideWidth: 0
        };
        Object.extend(this.options, options || {}); 
        this.internal.container = $$('.'+this.options.box)[0];
        this.internal.slider = $$('#'+this.options.slider);
        this.internal.items = this.internal.container.select(this.options.items);
        this.internal.currentItem = this.internal.items[0];
        this.internal.amount = this.internal.items.length;
        // var firstSlide = slides[0]; same as currentItem
        this.internal.slideWidth = this.internal.currentItem.getWidth();                                 //get first slides width to define animation offset

        this.internal.lastSlide = this.internal.items[this.internal.items.length-1]; 
        this.internal.lastSlideWidth = this.internal.lastSlide.getWidth();                              //get last slides width to define animation offset
        //Next/Prev Button click
        $$('.'+this.options.skipnext).each(function(elmnt){
            $(elmnt).observe('click', function(){ this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
        $$('.'+this.options.skipprev).each(function(elmnt){
            $(elmnt).observe('click', function(){ this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
    },
    buttonAction: function(e){
        if($(e).hasClassName(this.options.skipnext)){
            this.navigate(1);
            this.animate('next');
        }else{
            this.navigate(-1);
            this.animate('prev');
        }  
    },
    navigate: function(direction) {
    // hide the old current list item 
    this.internal.currentItem.removeClassName('current');
    // calculate the new position
    this.internal.counter = this.internal.counter + direction;
    if (direction === -1 && 
        this.internal.counter < 0) { 
      this.internal.counter = this.internal.amount - 1; 
    }
    if (direction === 1 && 
        !this.internal.items[this.internal.counter]) { 
      this.internal.counter = 0;
    }
    // set new current element and add CSS class
    this.internal.currentItem = this.internal.items[this.internal.counter];
    this.internal.currentItem.addClassName('current');
  },
  animate: function(direction){
    var timing = this.options.timing; 
    // var slider = this.internal.slider;
    var slides = this.internal.container.select(this.options.items);
    // convert to internals
    var firstSlide = this.internal.currentItem;
    // var slideWidth = firstSlide.getWidth();                                 //get first slides width to define animation offset
    // var lastSlide = this.internal.lastSlide; 
    // var lastSlideWidth = lastSlide.getWidth();                              //get last slides width to define animation offset

    if(direction === 'next'){                                               // if next is clicked animate slides this way
          this.offset(firstSlide, "next");
          this.slide.bind(this).delay(0.5, firstSlide, "next");
    }else{                                                                  // if prev is clicked animate slides this way
         this.offset(firstSlide, "prev");
         this.slide.delay(0.25, lastSlide, "prev");                                 //halving delay time makes previous slide animate at similar speed to next
    }
  },
  offset: function(elm,dir){
    if(dir === 'next'){
      thiswidth = this.internal.slideWidth;
    } else {
      this.internal.slider.insertBefore(this.internal.lastSlide, this.internal.currentItem);             //prepend last slide to first position
      thiswidth = this.internal.lastSlideWidth;
    }
    elm.setStyle({'margin-left': -thiswidth + 'px'});
  },
  slide: function(elm, dir){   
    if(dir === 'next'){
        this.internal.slider.appendChild(this.internal.currentItem);                      //append first slide to the last position
    }
    elm.setStyle({'margin-left': 0 + 'px'});                           //animate second slide to first position
  }
});
if ( $('fcategories') ) {
  $('fcategories').wrap('div', {'class': 'carouselbox active' });
    // Insert controls
 var fcategories = new carousel({
      box       : 'carouselbox',
      slider    : 'fcategories',
      controls  : 'catscontrols',
      skipnext  : 'next',
      skipprev  : 'prev',
      items     : 'dd',
      timing    :  500
  });
}