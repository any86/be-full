# be-full [![NPM Version][npm-image]][npm-url]

[npm-image]: https://badgen.net/npm/v/be-full
[npm-url]: https://npmjs.org/package/be-full

🍔 任意元素**全屏**显示, 支持PC/移动端, 不到**1kb**.

## 在线演示
[:rocket: 演示](https://any86.github.io/be-full/example/)

## 安装

```shell
npm i -S be-full
```

## 快速开始

```javascript
import {beFull} from 'be-full';

// 整个网页全屏显示
beFull();

// 指定元素全屏
beFull(document.getElementById('video'));
```

## 🔥更多API(4个函数)

### exitFull(退出全屏)
```javascript
exitFull();
```

### toggleFull(切换全屏/退出)
使用方法同`beFull`, 只是第二次点击会执行`exitFull`
```javascript
toggleFull();

// 切换指定元素全屏/退出
toggleFull(document.getElementById('video'));
```

### isFull(元素是否全屏)
```javascript
isFull(document.getElementById('video'));
```

### watchFull(监视元素全屏状态变化)
```javascript
const {cancel} = watchFull(document.documentElement, ev => {
    // 全屏状态变化执行         
});

// 取消监听
cancel();
```
