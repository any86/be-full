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

let RFC_METHOD_NAME: RFSMethodName = 'requestFullscreen';
let EFS_METHOD_NAME: EFSMethodName = 'exitFullscreen';
let FSE_PROP_NAME: FSEPropName = 'fullscreenElement';
let ON_FSC_PROP_NAME: ONFSCPropName = 'onfullscreenchange';

if (`webkitRequestFullScreen` in DOC_EL) {
    RFC_METHOD_NAME = 'webkitRequestFullScreen';
    EFS_METHOD_NAME = 'webkitExitFullscreen';
    FSE_PROP_NAME = 'webkitFullscreenElement';
    ON_FSC_PROP_NAME = 'onwebkitfullscreenchange';
} else if (`msRequestFullscreen` in DOC_EL) {
    RFC_METHOD_NAME = 'msRequestFullscreen';
    EFS_METHOD_NAME = 'msExitFullscreen';
    FSE_PROP_NAME = 'msFullscreenElement';
    ON_FSC_PROP_NAME = 'MSFullscreenChange';
} else if (`mozRequestFullScreen` in DOC_EL) {
    RFC_METHOD_NAME = 'mozRequestFullScreen';
    EFS_METHOD_NAME = 'mozCancelFullScreen';
    FSE_PROP_NAME = 'mozFullScreenElement';
    ON_FSC_PROP_NAME = 'onmozfullscreenchange';
} else if (!(`requestFullscreen` in DOC_EL)) {
    throw `当前浏览器不支持Fullscreen API !`;
}

/**
 * 启用全屏
 * @param  {HTMLElement} 元素
 * @param  {FullscreenOptions} 选项
 * @returns {Promise}
 */
export function beFull(el: HTMLElement = DOC_EL, options?: FullscreenOptions): Promise<void> {
    return el[RFC_METHOD_NAME](options);
}

/**
 * 退出全屏
 */
export function exitFull(): Promise<void> {
    return document[EFS_METHOD_NAME]();
}

/**
 * 元素是否全屏
 * @param {HTMLElement}
 */
export function isFull(el: HTMLElement | EventTarget): boolean {
    return el === document[FSE_PROP_NAME]
}

/**
 * 切换全屏/关闭
 * @param  {HTMLElement} 目标元素
 * @returns {Promise}
 */
export function toggleFull(el: HTMLElement = DOC_EL, options?: FullscreenOptions): Promise<void> {
    if (isFull(el)) {
        return exitFull();
    } else {
        return beFull(el, options)
    }
}

/**
 * 当全屏/退出时触发
 * @param  {HTMLElement} 元素
 * @param  {(isFull: boolean) => void} 返回"是否全屏"
 */
export function watchFull(el: HTMLElement, callback: (isFull: boolean) => void) {
    const cancel = () => {
        el.onfullscreenchange = null;
    };

    const handler = (event: Event) => {
        if (null !== event.target) {
            callback(isFull(event.target));
        }
    }

    // 这里addEventListener不好使
    el[ON_FSC_PROP_NAME] = handler;

    return {
        cancel
    }
}