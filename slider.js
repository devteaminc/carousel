// carousel = (function(){
//   // Read necessary elements from the DOM once
//   var box = $$('.carouselbox')[0];
//   var next = box.select('.next')[0];
//   var prev = box.select('.prev')[0];
//   // Define the global counter, the items and the current item 
//   var counter = 0;
//   var items = box.select('#fcategories dd');
//   var amount = items.length;
//   var current = items[0];

//   $(box).addClassName('active');
//   // navigate through the carousel
//   function navigate(direction) {
//     // hide the old current list item 
//     $(current).removeClassName('current');
//     // calculate the new position
//     counter = (counter + direction) % amount;
//     counter = counter < 0 ? amount - 1 : counter;
//     // set new current element and add CSS class
//     current = items[counter];
//     $(current).addClassName('current');
//   }
//    var slider = document.getElementById('fcategories');
//   $(next).observe('click', function(ev) {                          // add event handlers to buttons
//     navigate(1);
//     console.log(current);
//     var firstSlide = $$(".slide")[0];
//     var slideWidth = firstSlide.getWidth();                       //get first slides width to define animation offset

//     setTimeout(function(){
//       firstSlide.setStyle({'margin-left': -slideWidth + 'px'});   //offset second slide position to create animation

//       setTimeout(function(){
//         slider.appendChild(firstSlide);                           //append first slide to the last position
//         firstSlide.setStyle({'margin-left': 0 + 'px'});           //animate second slide to first position
//       },555);
//     }, 1);
//   });
//   $(prev).observe('click', function(ev) {
//     navigate(-1);
//     console.log(current);
//     var slides = $$('dd');
//     var lastSlide = slides[slides.length-1];                      //find last slide
//     var slideWidth = lastSlide.getWidth();                        //get last slides width to define animation offset

//     setTimeout(function(){
//       slider.insertBefore(lastSlide, slider.firstChild);          //prepend last slide to first position
//       lastSlide.setStyle({'margin-left': -slideWidth + 'px'});    //offset last slide to create animation 

//       setTimeout(function(){
//         lastSlide.setStyle({'margin-left': 0 + 'px'});            //animate last slide in to first position
//       },100);
//     }, 1);
//   });
// })();




var carousel = Class.create({
    initialize: function(options) {
        this.options = {
            box           : 'containerClass',  
            slider        : 'carousel',
            skipnext      : 'next',
            skipprev      : 'prev',
            items         : 'dd',
            firstSlide    : 'slide',
            lastSlide     : 'slide',
            timing        : 500,
        };
        this.internal = {
          // Define the global counter, the items and the current item 
          counter: 0,
          next   : '',
          prev   : '',
          items  : '',
          container : '',
          slider: ''
        };
        Object.extend(this.options, options || {}); 
        this.internal.container = $$('.'+this.options.box)[0];
        this.internal.slider = $(this.options.slider);
        this.internal.next = this.internal.container.select('.'+this.options.skipnext)[0];
        this.internal.prev = this.internal.container.select('.'+this.options.skipprev)[0];
        this.internal.items = this.internal.container.select(this.options.items);

        this.internal.container.addClassName('active');
        //On next/Prev click
        $$('.'+this.options.skipnext).each(function(elmnt){
            $(elmnt).observe('click', function(){ this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));
        $$('.'+this.options.skipprev).each(function(elmnt){
            $(elmnt).observe('click', function(){ this.buttonAction(elmnt);}.bindAsEventListener(this));
        }.bindAsEventListener(this));

    },
    buttonAction: function(e){
        var timing = this.options.timing; 
        var currentItem = this.internal.items[0];
        if($(e).hasClassName(this.options.skipnext)){

            this.navigate(1);
            console.log(currentItem);
            var firstSlide = $$("."+this.options.firstSlide)[0];
            var slideWidth = firstSlide.getWidth();                                //get first slides width to define animation offset

            setTimeout(function(){
              firstSlide.setStyle({'margin-left': -slideWidth + 'px'});          //offset second slide position to create animation
              setTimeout(function(){
                this.internal.slider.appendChild(firstSlide);                                 //append first slide to the last position
                firstSlide.setStyle({'margin-left': 0 + 'px'});                //animate second slide to first position
              }.bind(this),timing);
            }.bind(this), 1);

        }else{

            this.navigate(-1);
            console.log(currentItem);
            var lastSlide = this.internal.items[this.internal.items.length-1];                       //find last slide
            var lastSlideWidth = lastSlide.getWidth();                                              //get last slides width to define animation offset

            setTimeout(function(){
              this.internal.slider.insertBefore(lastSlide, this.internal.slider.firstChild);     //prepend last slide to first position
              lastSlide.setStyle({'margin-left': -lastSlideWidth + 'px'});                      //offset last slide to create animation 
              setTimeout(function(){
                lastSlide.setStyle({'margin-left': 0 + 'px'});                                //animate last slide in to first position
              }.bind(this),timing);
            }.bind(this), 1);
        }
            // this.navigate(0);                                                              // show the first element (when direction is 0 counter doesn't change)
          
    },
    navigate: function(direction) {
    var currentItem = this.internal.items[0];
    var amount = this.internal.items.length;
    // hide the old current list item 
    currentItem.removeClassName('current');
    console.log(currentItem);
    // calculate the new position
    this.internal.counter = this.internal.counter + direction;
    // this.internal.counter = (this.internal.counter < 0) ? (amount - 1) : this.internal.counter;
    if (direction === -1 && 
        this.internal.counter < 0) { 
      this.internal.counter = amount - 1; 
    }
    if (direction === 1 && 
        !this.internal.items[this.internal.counter]) { 
      this.internal.counter = 0;
    }
    // set new current element and add CSS class
    currentItem = this.internal.items[this.internal.counter];
    currentItem.addClassName('current');
    console.log(currentItem);
  }

});

 var caro = new carousel({
      box       : 'carouselbox',
      slider    : 'fcategories',
      skipnext  : 'next',
      skipprev  : 'prev',
      items     : 'dd',
      firstSlide: 'slide',
      timing    :  555
  });

    
