/*<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
<><><><><><><><><><><><><><><><>  Carousel v0.2 <><><><><><><><><><><><><><><><><><><><><><><><><><>
<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>*/
/**
 * @author Alan Sutherland 
 * @license MIT
 * @require prototype.js
 */

if (typeof(Prototype) == "undefined") {
    throw "protoValid requires prototype.js";
}

var timeout;                                                             // stores timeout object

var carousel = Class.create({
    initialize: function(options) {
        // Define the options users can update when creating a new carousel
        this.options = {
          box             : 'containerClass',  
          slider          : 'carousel',
          controls        : 'controlsClass',
          skipnext        : 'next',
          skipprev        : 'prev',
          items           : 'dd',
          timing          : 1,
          vertical        : false,
          vertWidth       : 300,
          vertHeight      : 800,
          automate        : false
        };
        this.internal = {
        // Define the global counter, the items and the current item 
          counter         : 0,
          items           : '',
          currentItem     : '',
          amount          : 0,
          container       : '',
          slider          : '',
          firstSlide      : '',
          slideWidth      : 0,
          lastSlide       : '',
          lastSlideWidth  : 0,
          slideHeight     : 0,
          lastSlideHeight : 0,
          vertical        : false,
          xDown           : null,
          yDown           : null,
          automate        : false
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
        // get last slides width to define animation offset
        this.internal.lastSlideWidth = this.internal.lastSlide.getWidth(); 
        // Check if slider should be displayed vertically (horizontal by default)
        this.internal.vertical = this.options.vertical;   
        // Get height of first and last slides  
        this.internal.slideHeight =  this.internal.firstSlide.getHeight();  
        this.internal.lastSlideHeight =  this.internal.lastSlide.getHeight(); 
        // Touchswipe looking for initial touch and drags, fires two separate functions 
        this.internal.xDown = null;
        this.internal.yDown = null;
        this.internal.container.observe('touchstart', this.handleTouchStart.bindAsEventListener(this), false);        
        this.internal.container.observe('touchmove', this.handleTouchMove.bindAsEventListener(this), false); 

        // if(this.internal.auto === true){ 
           
        // }
        // this.auto();

        // new PeriodicalExecuter(function() {
        //   if(this.options.auto){
        //     this.animate('next');
        //   }
        // }, 3);


        timeout = setTimeout(function() { 
          this.animateAuto();
        }.bindAsEventListener(this),(3));

        // If Vertical is set, change container style
        if(this.internal.vertical === true){
           this.internal.slider.setStyle({'width': '100%'});
           this.internal.container.setStyle({'width': this.options.vertWidth + 'px', 'height': this.options.vertHeight + 'px'});
           this.internal.slider.childElements().each(function(e){
            e.setStyle({'width': '100%'});
          });
           $(this.options.controls).childElements()[0].addClassName('rewind-vert');
           $(this.options.controls).childElements()[1].addClassName('forward-vert');
        }                         
        // Next/Prev Button click listeners
        $$('.' + this.options.skipnext).each(function(elmnt){
            $(elmnt).observe('click', function(){ 
              this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
        $$('.' + this.options.skipprev).each(function(elmnt){
            $(elmnt).observe('click', function(){ 
              this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
    },
  buttonAction: function(e){
          // if next button is clicked
      if($(e).hasClassName(this.options.skipnext)){
          // animate slides forwards
          this.animate('next');
      }else{
          // animate slides backwards
          this.animate('prev');
      }  
  },
  handleTouchStart: function(evt) {                                   
      this.internal.xDown = evt.touches[0].clientX;                                      
      this.internal.yDown = evt.touches[0].clientY;                                      
  },
  handleTouchMove: function(evt) {
      if ( ! this.internal.xDown || ! this.internal.yDown ) {
          return;
      }
      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;
      var xDiff = this.internal.xDown - xUp;
      var yDiff = this.internal.yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) && this.internal.vertical === false ) {/*most significant*/
          if ( xDiff > 0 ) {
              /* left swipe */ 
              this.animate('next');
          } else {
              /* right swipe */
              this.animate('prev');
          }                       
      } else {
          if ( yDiff > 0 ) {
              /* up swipe */ 
              this.animate('next');
          } else { 
              /* down swipe */
              this.animate('prev');
          }                                                                 
      }
      /* reset values */
      this.internal.xDown = null;
      this.internal.yDown = null;                                             
  },
  animate: function(direction){
    // get timing 
    var timing = this.options.timing;
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
    this.internal.slideHeight =  this.internal.firstSlide.getHeight();  
    this.internal.lastSlideHeight =  this.internal.lastSlide.getHeight(); 
    // if next is clicked animate slides this way                                  
    if(direction === 'next'){  
          // the offset is neccessary to create the animation effect
          // offset new first slide by the width of the old first slide, 'next' directs the function to select the first slide                                               
          this.offset(this.internal.firstSlide, "next");
          // append the old last slide to last position and slide in the new first slide, delaying this function creates the animation effect
          this.slide.bind(this, this.internal.firstSlide, "next").delay(0.5);
    }else{  
         // if prev is clicked animate slides this way  
         // prepend last slide in to first position, animate slides based on width of this slide                                                        
         this.offset(this.internal.lastSlide, "prev");
         // halving delay time makes previous slide animate at similar speed to next
         this.slide.bind(this, this.internal.lastSlide, "prev").delay(0.1);
    }
  },
  // offset takes two arguments one to define the target element and another to check which button has been clicked
  offset: function(elm,dir){
    // if next has been clicked the slide width is the old first slides width
    if(dir === 'next'){
      thisWidth = this.internal.slideWidth;
      thisHeight = this.internal.slideHeight;
    } else {
      // if prev is clicked prepend slides with last slide and set slide width to last slides width
      this.internal.slider.insert({top: elm});             //prepend last slide to first position
      thisWidth = this.internal.lastSlideWidth;
      thisHeight = this.internal.lastSlideHeight;
    }
    if(this.internal.vertical === false){
      // offset the slides by width of the selected slide i.e. first/last
      elm.setStyle({'margin-left': -thisWidth + 'px'});
    } else {
      elm.setStyle({'margin-top': -thisHeight + 'px'});
    }
  },
  // slide takes two arguments one to define the target element and another to check which button has been clicked
  slide: function(elm, dir){   

    // if next has been clicked append the old first slide to the end of the slides
    if(dir === 'next'){
        //append first slide to the last position
        this.internal.slider.insert({bottom:elm});                      
    }
    if(this.internal.vertical === false){
      // set the first/last slides margin to 0 to create animation effect (this relies on CSS animation)
      elm.setStyle({'margin-left': 0 + 'px'});   
    } else {
      elm.setStyle({'margin-top': 0 + 'px'});
    }                  
  },
  animateAuto: function(){                                                                    // automatic transitions
          if(this.options.automate){
              timeout = setTimeout(function() { 
                this.animateAuto();
              }.bindAsEventListener(this),(3));
          }
      },
});
