[![GitHub version](https://badge.fury.io/gh/fimperato%2FPaginateBootstrapAssistancePlugin.svg)](http://badge.fury.io/gh/fimperato%2FPaginateBootstrapAssistancePlugin)
PaginateBootstrapAssistance
=======
Flat, responsive, lightweight, fast, easy customizable Bootrstrap Pagination Component assistance plugin.

Minified version size: ~4kb

#IMPORTANT!
To use this plugin you need Bootstrap framework

## Notes

* Test on Bootrstrap v3.2.0 (http://getbootstrap.com)
* All modern browsers are supported.


## Start

That's very simple to start using PaginateBootstrapAssistance plugin.

Download and add Bootstrap files.

[Download it](https://github.com/fimperato/PaginateBootstrapAssistance/archive/master.zip). 

Add this in the head section:
```html
<script type="text/javascript" src="js/plugins/paginateBootstrapAssistance.js"></script>
```

Define the Bootstrap pagination component (http://getbootstrap.com/components/#pagination). It could be the same like in Boostrap Get Start page, and with zero or one page item:
```html
<nav>
  <ul class="pagination">
    <li><a href="#">&laquo;</a></li>
    <li><a href="#">1</a></li>
	...One page item: plugin will work on DOM 
    <li><a href="#">&raquo;</a></li>
  </ul>
</nav>
```



## Options

You can pass additional options by the data-remodal-options attribute.
```html
var options = { 
		idToReload: ..,
		contentsFolderName: ..,
		numberOfPage: ..,
		numberOfVisiblePage: ..,
		selectedColor: ..,
		fadeOutDuration: ..,
		fadeOutEasing: ..,
		fadeInDuration: ..,
		renderAllComponent: ..
	}
```

#### idToReload
`Default: pageContentsToReload`

Define selector with region to reload

#### contentsFolderName
`Default: contentsFolder`

Define a folder path: this folder will contain all page to use and reload in pagination process.

#### numberOfPage
`Default: 1`

Number total of page item.

#### numberOfVisiblePage
`Default: 1`

Number of visibile page item.

#### selectedColor
`Default: #C0C0C0`

Background color of selected item.

#### fadeOutDuration
`Default: fast`

A string or number determining how long the initial fade out animation will run.

#### fadeOutEasing
`Default: swing`

A string indicating which easing function to use for the transition.

#### fadeInDuration
`Default: slow`

A string or number determining how long the final fade in animation will run.

#### renderAllComponent
`Default: false`

If set to true, plugin render on all .pagination Bootstrap on page. Otherwise, it render only single component clicked.

## Callback function

```js
$(selector).paginateBootstrapAssistance(options, function () {
    console.log('callback');
	//... this callback function will be called after page reloading
});
```

