# 3D Carousel

### Usage:

 - Copy `carousel.css` and `carousel.js` into your project.
 - Import the files by adding `<link  rel="stylesheet"  href="./carousel.css">` and `<script  src="./carousel.js"></script>` to your site `<head>`.
 - Make a `div` with the class name `"carousel-container"`, and add `div` elements as children with the class names `carousel-element`. The `carousel-container` defines the bounds of the carousel and the `carousel-element`s are the elements that will rotate around it. The elements are anchored by their bottom center point, so you may want to add some padding to the parent of the container such as
```
box-sizing: border-box;
padding: 300px  300px  70px  300px;
overflow: hidden;
```
 - Once the page has loaded, instantiate the carousel by passing the container element to the constructor e.g. `carousel = new Carousel(document.querySelector('.carousel-container');`.
 - Finally, rotate the carousel to the element you want in the center by calling `carousel.focus(index);`, where `index` is the 0-based index number of the element to highlight.

See a functional demo [here](https://mikeball1289.github.io/).

### Debugging

You can pass a debug parameter to the carousel constructor `new Carousel(container, { debug: true });` to get debug logs in the developer console.
