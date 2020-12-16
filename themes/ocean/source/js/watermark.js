// 明水印 方法一
// function cssHelper(el, prototype) {
//   for (let i in prototype) {
//       el.style[i] = prototype[i]
//   }
// }
// const waterWrapper = document.createElement('div');
// cssHelper(waterWrapper, {
//   position: 'fixed',
//   top: '0px',
//   right: '0px ',
//   bottom: '0px',
//   left: '0px',
//   overflow: 'hidden',
//   display: 'flex',
//   'flex-wrap': 'wrap',
//   'pointer-events': 'none'
// })
// const waterHeight = 100;
// const waterWidth = 180;
// const { clientWidth, clientHeight } = document.documentElement || document.body;
// const column = Math.ceil(clientWidth / waterWidth);
// const rows = Math.ceil(clientHeight / waterHeight);

// function createItem() {
//   const item = document.createElement('div')
//   item.innerHTML = 'alivn'
//   cssHelper(item, {
//       position: 'absolute',
//       top: `50px`,
//       left: `50px`,
//       fontSize: `28px`,
//       color: '#000',
//       lineHeight: 1.5,
//       opacity: 0.04,
//       transform: `rotate(-15deg)`,
//       transformOrigin: '0 0',
//       userSelect: 'none',
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//   })
//   return item
// }
// for (let i = 0; i < column * rows; i++) {
//   const wrap = document.createElement('div');
//   cssHelper(wrap, Object.create({
//       position: 'relative',
//       width: `${waterWidth}px`,
//       height: `${waterHeight}px`,
//       flex: `0 0 ${waterWidth}px`,
//       overflow: 'hidden',
//   }));
//   wrap.appendChild(createItem());
//   waterWrapper.appendChild(wrap)
// }
// document.body.appendChild(waterWrapper)

// 明水印 方法二
// function createWaterMark() {
//   const angle = -20;
//   const txt = 'alivn'
//   const canvas = document.createElement('canvas');
//   canvas.width = 180;
//   canvas.height = 100;
//   const ctx = canvas.getContext('2d');
//   ctx.clearRect(0, 0, 180, 100);
//   ctx.fillStyle = '#000';
//   ctx.globalAlpha = 0.05;
//   ctx.font = `28px serif`
//   ctx.rotate(Math.PI / 180 * angle);
//   ctx.fillText(txt, 0, 50);
//   return canvas.toDataURL();
// }
// const watermakr = document.createElement('div');
// watermakr.className = 'watermark';
// watermakr.style.backgroundImage = `url(${createWaterMark()})`
// document.body.appendChild(watermakr);

// 明水印 方法三
function createWaterMark() {
  const svgStr =
    `<svg xmlns="http://www.w3.org/2000/svg" width="180px" height="100px">
      <text x="0px" y="30px" dy="16px"
      text-anchor="start"
      stroke="#000"
      stroke-opacity="0.05"
      fill="none"
      transform="rotate(-20)"
      font-weight="100"
      font-size="28"
      >
      	alivn
      </text>
    </svg>`;
  return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
}
const watermakr = document.createElement('div');
watermakr.className = 'watermark';
watermakr.style.backgroundImage = `url(${createWaterMark()})`
document.body.appendChild(watermakr);


// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };
// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
// Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    mutation.removedNodes.forEach(function (item) {
      if (item === watermakr) {
      	document.body.appendChild(watermakr);
      }
    });
  }
};
// 监听元素
const targetNode = document.body;
// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);
// 以上述配置开始观察目标节点
observer.observe(targetNode, config);
