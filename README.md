
```
 							  / __\__ _ _ __ ___  _   _ ___  ___| |
 							 / /  / _` | '__/ _ \| | | / __|/ _ \ |
							/ /__| (_| | | | (_) | |_| \__ \  __/ |
							\____/\__,_|_|  \___/ \__,_|___/\___|_|
```
An image Carousel slider built using Prototype.js and CSS Animations. This plugin has a hard dependency on Prototype.js.

##Options

| Option          | Default           | Description                                                          |
|-----------------|-------------------|----------------------------------------------------------------------|
| box             | 'containerClass'  | The class of the Carousel container                                  |
| slider          | 'carousel'        | The class of the carousel                                            |
| controls        | 'controlsClass'   | The class of the controls container                                  |
| skipnext        | 'next'            | The class of the next button                                         |
| skipprev        | 'prev'            | The class of the previous button                                     |
| items           | 'dd'              | The element slides are wrapped in                                    |
| timing          | 1                 | Timing for transitions (anything below 1 second can be buggy)        |
| vertical        | false             | If set to true this will change the layout to vertical               |
| vertWidth       | 300               | Set the width of the vertical container                              |
| vertHeight      | 800               | Set the height of the vertical container                             |

##Example implementation

```
// Invoke carousel if slider element exists
if ( $('fcategories') ) {    
		
  // Insert carouselbox div and wrap slider container within it 
  // Use this if you do not have access to the markup and need to add elements in using JS:
  $('fcategories').wrap('div', {'class': 'carouselbox active' });
  
  // Insert controls 
  // Use this if you do not have access to the markup and need to add elements in using JS:
  $('fcategories').insert({before:'<div id="catscontrols"><a class="rewind prev">&laquo; Prev</a><a class="forward next">Next &raquo;</a></div>'});
  
  // The most important part, create the new carousel and set options:
 	var fcategories = new carousel({
      box       : 'carouselbox',
      slider    : 'fcategories',
      controls  : 'catscontrols',
      skipnext  : 'next',
      skipprev  : 'prev',
      items     : 'dd',
      timing    : 1 
    });
  }
```

##Demo:
```
<iframe width="100%" height="300" src="//jsfiddle.net/rL3xc86L/5/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
```