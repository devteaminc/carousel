/*================================================================================================================
// Carousel Script 
/*================================================================================================================

/* ---------------------- Carousel Class v0.1 by Alan Sutherland ---------------------------------- */
var carousel = Class.create({
    initialize: function(options) {
        // define the options users can update when creating a new carousel
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
          firstSlide: '',
          slideWidth: 0,
          lastSlide: '',
          lastSlideWidth: 0
        };
        Object.extend(this.options, options || {}); 
        // select container
        this.internal.container = $$('.'+this.options.box)[0];
        // select slides wrapper
        this.internal.slider = $(this.options.slider);
        // select slides
        this.internal.items = this.internal.container.select(this.options.items);
        // select slide with 'current' class
        this.internal.currentItem = this.internal.items[0];
        // calculate number of slides
        this.internal.amount = this.internal.items.length;
        // locate first slide
        this.internal.firstSlide = this.internal.container.select(this.options.items)[0];
        //get first slides width to define animation offset
        this.internal.slideWidth = this.internal.firstSlide.getWidth();  
        // locate last slide                    
        this.internal.lastSlide = this.internal.container.select(this.options.items+':last')[0]; 
        //get last slides width to define animation offset
        this.internal.lastSlideWidth = this.internal.lastSlide.getWidth();                              
        //Next/Prev Button click listeners
        $$('.'+this.options.skipnext).each(function(elmnt){
            $(elmnt).observe('click', function(){ this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
        $$('.'+this.options.skipprev).each(function(elmnt){
            $(elmnt).observe('click', function(){ this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
    },
    buttonAction: function(e){
        // if next button is clicked
        if($(e).hasClassName(this.options.skipnext)){
            // move current class forwards to next slide
            this.navigate(1);
            // animate slides forwards
            this.animate('next');
        }else{
            // move current class backwards
            this.navigate(-1);
            // animate slides backwards
            this.animate('prev');
        }  
    },
    navigate: function(direction) {
    // remove current class from old slide
    this.internal.currentItem.removeClassName('current');
    // calculate the new position
    this.internal.counter = this.internal.counter + direction;
    // clicked previous
    if (direction === -1 && 
        this.internal.counter < 0) { 
      this.internal.counter = this.internal.amount - 1; 
    }
    // clicked next
    if (direction === 1 && 
        !this.internal.items[this.internal.counter]) { 
      // reset counter
      this.internal.counter = 0;
    }
    // set new current slide and add class
    this.internal.currentItem = this.internal.items[this.internal.counter];
    this.internal.currentItem.addClassName('current');
  },
  animate: function(direction){
    // get timing 
    var timing = this.options.timing;
    console.log(timing); 
    // select all slides
    slides = this.internal.container.select(this.options.items);
    // set new first slide
    this.internal.firstSlide = slides[0];
    //get first slides width to define animation offset
    this.internal.slideWidth = this.internal.firstSlide.getWidth();   
    // set new last slide                                      
    this.internal.lastSlide = slides[slides.length-1]; 
    //get last slides width to define animation offset
    this.internal.lastSlideWidth = this.internal.lastSlide.getWidth();  
    // if next is clicked animate slides this way                                  
    if(direction === 'next'){  
          // the offset is neccessary to create the animation effect
          // offset new first slide by the width of the previous first slide, the 'next' string directs the function to select the first slide                                                
          this.offset(this.internal.firstSlide, "next");
          // append the old last slide to last position and slide in the new first slide, delaying this function creates the animation effect
          this.slide.bind(this, this.internal.firstSlide, "next").delay(0.5);
    }else{  
         // if prev is clicked animate slides this way  
         // prepend last slide in to first position, animate slides based on width of this slide                                                        
         this.offset(this.internal.lastSlide, "prev");
         // halving delay time makes previous slide animate at similar speed to next
         this.slide.bind(this, this.internal.lastSlide, "prev").delay(0.25);    
    }
  },
  // offset takes two arguments one to define the target element and another to check which button has been clicked
  offset: function(elm,dir){
    // if next has been clicked the slide width is the old first slides width
    if(dir === 'next'){
      thiswidth = this.internal.slideWidth;
    } else {
      // if prev is clicked prepend slides with last slide and set slide width to last slides width
      this.internal.slider.insertBefore(this.internal.lastSlide, this.internal.firstSlide);             //prepend last slide to first position
      thiswidth = this.internal.lastSlideWidth;
    }
    // offset the slides by width of the selected slide i.e. first/last
    elm.setStyle({'margin-left': -thiswidth + 'px'});
  },
  // slide takes two arguments one to define the target element and another to check which button has been clicked
  slide: function(elm, dir){   
    // if next has been clicked append the old first slide to the end of the slides
    if(dir === 'next'){
        this.internal.slider.appendChild(elm);                      //append first slide to the last position
    }
    // set the first/last slides margin to 0 to create animation effect (this relies on CSS animation)
    elm.setStyle({'margin-left': 0 + 'px'});                           
  }
});
if ( $('fcategories') ) {
  $('fcategories').wrap('div', {'class': 'carouselbox active' });
  // create new carousel based on prototype
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