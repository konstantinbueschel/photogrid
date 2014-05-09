# Photogrid [![Appcelerator Titanium](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://www.appcelerator.com/alloy/)

Alloy Widget for showing photos with thumbnail grid

![demo](https://raw2.github.com/manumaticx/demos/master/photogrid/screenshots/android_02_framed.png)

## Features
* different columns in portrait and landscape
* handles orientaion change
* scrollable fullscreen detail view

## Quick Start

### Installation [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/de.manumaticx.photogrid)
Download the latest distribution ZIP-file and consult the [Titanium Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module) on how install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install de.manumaticx.photogrid`

### Usage

```javascript
var photogrid = Alloy.createWidget("de.manumaticx.photogrid");

var gridWindow = photogrid.createWindow({
    data: data
});

gridWindow.open();
```
__data__ (Array) is a list of __item__s (Object) with these properties:
- image _(required)_
- thumb _(optional)_
- title _(optional)_
 
See a demo [here](https://github.com/manumaticx/demos/tree/master/photogrid)

## License
    
    The MIT License (MIT)
    
    Copyright (c) 2014 Manuel Lehner
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

