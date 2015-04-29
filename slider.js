
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
          slider: ''
        };
        Object.extend(this.options, options || {}); 
        this.internal.container = $$('.'+this.options.box)[0];
        this.internal.slider = $(this.options.slider);
        this.internal.items = this.internal.container.select(this.options.items);
        this.internal.currentItem = this.internal.items[0];
        this.internal.amount = this.internal.items.length;
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
            this.animate(1);
        }else{
            this.navigate(-1);
            this.animate(-1);
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
  animate: function(d){
    var timing = this.options.timing; 
    var slider = this.internal.slider;
    var slides = this.internal.container.select(this.options.items);
    var firstSlide = slides[0];
    var slideWidth = firstSlide.getWidth();                                         //get first slides width to define animation offset
    var lastSlide = slides[slides.length-1]; 
    var lastSlideWidth = lastSlide.getWidth();                                    //get last slides width to define animation offset
    if(d > 0){                                                                   // if next is clicked animate slides this way
      function offset(){                                                        // offset and slide and seperated in to functions to allow for a delay
            firstSlide.setStyle({'margin-left': -slideWidth + 'px'});          //offset second slide position to create animation 
          }
      function slide(){   
            slider.appendChild(firstSlide);                                  //append first slide to the last position
            firstSlide.setStyle({'margin-left': 0 + 'px'});                 //animate second slide to first position
          }
          offset();
          slide.delay(0.5);
    }else{                                                             // if prev is clicked animate slides this way
     function offsetPrev(){
           slider.insertBefore(lastSlide, firstSlide);                //prepend last slide to first position
           lastSlide.setStyle({'margin-left': -lastSlideWidth + 'px'});     //offset last slide to create animation 
         }
     function slidePrev(){   
           lastSlide.setStyle({'margin-left': 0 + 'px'});                  //animate last slide in to first position
         }
         offsetPrev();
         slidePrev.delay(0.25);               //halving delay time makes previous slide animate at similar speed to next
    }
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