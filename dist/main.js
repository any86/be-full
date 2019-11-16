const DOC_EL = document.documentElement;
let RFC_METHOD_NAME = 'requestFullscreen';
let EFS_METHOD_NAME = 'exitFullscreen';
let FSE_PROP_NAME = 'fullscreenElement';
let ON_FSC_PROP_NAME = 'onfullscreenchange';
if (`webkitRequestFullScreen` in DOC_EL) {
    RFC_METHOD_NAME = 'webkitRequestFullScreen';
    EFS_METHOD_NAME = 'webkitExitFullscreen';
    FSE_PROP_NAME = 'webkitFullscreenElement';
    ON_FSC_PROP_NAME = 'onwebkitfullscreenchange';
}
else if (`msRequestFullscreen` in DOC_EL) {
    RFC_METHOD_NAME = 'msRequestFullscreen';
    EFS_METHOD_NAME = 'msExitFullscreen';
    FSE_PROP_NAME = 'msFullscreenElement';
    ON_FSC_PROP_NAME = 'MSFullscreenChange';
}
else if (`mozRequestFullScreen` in DOC_EL) {
    RFC_METHOD_NAME = 'mozRequestFullScreen';
    EFS_METHOD_NAME = 'mozCancelFullScreen';
    FSE_PROP_NAME = 'mozFullScreenElement';
    ON_FSC_PROP_NAME = 'onmozfullscreenchange';
}
else if (!(`requestFullscreen` in DOC_EL)) {
    throw `当前浏览器不支持Fullscreen API !`;
}
export function beFull(el = DOC_EL, options) {
    return el[RFC_METHOD_NAME](options);
}
export function exitFull() {
    return document[EFS_METHOD_NAME]();
}
export function isFull(el) {
    return el === document[FSE_PROP_NAME];
}
export function toggleFull(el = DOC_EL, options) {
    if (isFull(el)) {
        return exitFull();
    }
    else {
        return beFull(el, options);
    }
}
export function watchFull(el, callback) {
    const handler = (event) => {
        if (null !== event.target) {
            callback(isFull(event.target));
        }
    };
    el[ON_FSC_PROP_NAME] = handler;
    return () => {
        el.onfullscreenchange = null;
    };
}
//# sourceMappingURL=main.js.map