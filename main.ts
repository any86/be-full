type RFSMethodName = 'webkitRequestFullScreen' | 'requestFullscreen' | 'msRequestFullscreen' | 'mozRequestFullScreen';
type EFSMethodName = 'webkitExitFullscreen' | 'msExitFullscreen' | 'mozCancelFullScreen' | 'exitFullscreen';
type FSEPropName = 'webkitFullscreenElement' | 'msFullscreenElement' | 'mozFullScreenElement' | 'fullscreenElement';
type ONFSCPropName = 'onfullscreenchange' | 'onwebkitfullscreenchange' | 'onmozfullscreenchange' | 'MSFullscreenChange';

/**
 * caniuse
 * https://caniuse.com/#search=Fullscreen
 * 参考 MDN, 并不确定是否有o前缀的, 暂时不加入
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen
 * 各个浏览器
 * https://www.wikimoe.com/?post=82
 */
const DOC_EL = document.documentElement;
let headEl = DOC_EL.querySelector('head');
const styleEl = document.createElement('style');
let TYPE_REQUEST_FULL_SCREEN: RFSMethodName = 'requestFullscreen';
let TYPE_EXIT_FULL_SCREEN: EFSMethodName = 'exitFullscreen';
let TYPE_FULL_SCREEN_ELEMENT: FSEPropName = 'fullscreenElement';
let TYPE_ON_FULL_SCREEN_CHANGE: ONFSCPropName = 'onfullscreenchange';

if (`webkitRequestFullScreen` in DOC_EL) {
    TYPE_REQUEST_FULL_SCREEN = 'webkitRequestFullScreen';
    TYPE_EXIT_FULL_SCREEN = 'webkitExitFullscreen';
    TYPE_FULL_SCREEN_ELEMENT = 'webkitFullscreenElement';
    TYPE_ON_FULL_SCREEN_CHANGE = 'onwebkitfullscreenchange';
} else if (`msRequestFullscreen` in DOC_EL) {
    TYPE_REQUEST_FULL_SCREEN = 'msRequestFullscreen';
    TYPE_EXIT_FULL_SCREEN = 'msExitFullscreen';
    TYPE_FULL_SCREEN_ELEMENT = 'msFullscreenElement';
    TYPE_ON_FULL_SCREEN_CHANGE = 'MSFullscreenChange';
} else if (`mozRequestFullScreen` in DOC_EL) {
    TYPE_REQUEST_FULL_SCREEN = 'mozRequestFullScreen';
    TYPE_EXIT_FULL_SCREEN = 'mozCancelFullScreen';
    TYPE_FULL_SCREEN_ELEMENT = 'mozFullScreenElement';
    TYPE_ON_FULL_SCREEN_CHANGE = 'onmozfullscreenchange';
} else if (!(`requestFullscreen` in DOC_EL)) {
    throw `当前浏览器不支持Fullscreen API !`;
}

/**
 * 如果传入的不是HTMLElement,
 * 比如是EventTarget
 * 那么返回document.documentElement
 * @param el 目标元素
 * @returns 目标元素或者document.documentElement
 */
function getCurrentElement(el?: HTMLElement) {
    return el instanceof HTMLElement ? el : DOC_EL;
}

/**
 * 启用全屏
 * @param  元素
 * @param   选项
 */
export function beFull(el?: HTMLElement, backgroundColor?: string): Promise<void> {
    if (backgroundColor) {
        if (null === headEl) {
            headEl = document.createElement('head');
        }
        styleEl.innerHTML = `:fullscreen{background-color:${backgroundColor};}`;
        headEl.appendChild(styleEl);
    }
    return getCurrentElement(el)[TYPE_REQUEST_FULL_SCREEN]();
}

/**
 * 退出全屏
 */
export function exitFull(): Promise<void> {
    if (DOC_EL.contains(styleEl)) {
        headEl?.removeChild(styleEl)
    }
    return document[TYPE_EXIT_FULL_SCREEN]();
}

/**
 * 元素是否全屏
 * @param 目标元素
 */
export function isFull(el?: HTMLElement): boolean {
    return getCurrentElement(el) === document[TYPE_FULL_SCREEN_ELEMENT]
}

/**
 * 切换全屏/关闭
 * @param  目标元素
 * @returns Promise
 */
export function toggleFull(el?: HTMLElement, backgroundColor?: string): boolean {
    if (isFull(el)) {
        exitFull();
        return false;
    } else {
        beFull(el, backgroundColor)
        return true;
    }
}