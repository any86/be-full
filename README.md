# be-full [![NPM Version][npm-image]][npm-url] [![Size][size-image]][size-url]

[npm-image]: https://badgen.net/npm/v/be-full
[npm-url]: https://npmjs.org/package/be-full
[size-image]: https://badgen.net/bundlephobia/minzip/be-full
[size-url]: https://bundlephobia.com/result?p=be-full

**Full screen display**, support PC/mobile, less than **1kb**. [:rocket:Online demo](https://any86.github.io/be-full/example/)
## Language
[中文](README.CN.md) | **English**

## Install

```shell
npm i -S be-full
```

## ⚡ quick start

##### web page full screen

```javascript
import {beFull} from 'be-full';
beFull();
```
##### element fullscreen
```javascript
const el = document.getElementById('video');
beFull(el);
```
#### set css property ":fullscreen"

If there is a "black" gap (or other colors) when the element is full screen, the second parameter can be set to the specified color.
````javascript
const el = document.getElementById("video");
beFull(el, "#fff");
````
**Note:** After executing "**exitFull**" or "**toggleFull**", the setting of ":fullscreen" will be automatically canceled.


## 🔥 API

##### exitFull(Exit Full Screen)
```javascript
exitFull();
```

##### toggleFull (toggle full screen/exit)
The method of use is the same as `beFull`, except that the second click will execute `exitFull`
````javascript
toggleFull();

// Switch the specified element to full screen/exit
toggleFull(document.getElementById('video'));
````

##### isFull (whether the element is full screen)
````javascript
isFull(document.getElementById('video')); // true or false
````