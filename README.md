A simple image Carousel slider built using vanilla JS, Prototype and CSS Animations

<h2>Options</h2>h2>

Option 			   Default 			  Description

box             : 'containerClass'  - The class of the Carousel container
slider          : 'carousel',		- The class of the Carousel
controls        : 'controlsClass'	- The class of the controls container
skipnext        : 'next'			- The class of the next button
skipprev        : 'prev'			- The class of the previous button
items           : 'dd'				- The element slides are wrapped in
timing          : 1					- Timing for transitions (anything below 1 second can be buggy)
vertical        : false				- If set to true this will change the layout to vertical
vertWidth       : 300				- Set the width of the vertical container
vertHeight      : 800				- Set the height of the vertical container

<h2>Example implementation</h2>

if ( $('fcategories') ) {
  $('fcategories').wrap('div', {'class': 'carouselbox active' });
  // create new carousel based on prototype class
 var fcategories = new carousel({
      box       : 'carouselbox',
      slider    : 'fcategories',
      controls  : 'catscontrols',
      skipnext  : 'next',
      skipprev  : 'prev',
      items     : 'dd',
      timing    : 1
      // vertical  : true,
      // vertWidth : 285,
      // vertHeight: 875
  });
}