(() => {
  'use strict';
  const scene = document.getElementById('scene');
  const display = document.getElementById('display');
  const panels = [...document.querySelectorAll('.panel')];
  const dots = [...document.querySelectorAll('[data-page]')];
  const count = document.getElementById('page-count');
  const bookNumber = document.getElementById('book-number');
  const announcement = document.getElementById('page-announcement');
  const motionToggle = document.querySelector('.motion-toggle');
  const controls = document.querySelector('.page-controls');
  const hint = document.querySelector('.gesture-hint');
  const stack = document.querySelector('.floating-stack');
  const book = document.querySelector('.book-base');
  const projector = document.getElementById('projector');
  const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sweepDuration = 1200;
  const resolveDuration = 220;
  const entryDuration = sweepDuration + resolveDuration + 40;
  const names = ['ようこそ', 'ページづくり', '保存の案内'];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  let index = Math.max(0, panels.findIndex(panel => '#' + panel.id === location.hash));
  let busy = false;
  let quietMotion = false;
  let touchStart = null;

  // Use layout coordinates so the light stays attached to the book during animation,
  // resizing, text zoom and page changes. Transformed screen bounds would drift.
  function alignProjection() {
    const sourceX = book.offsetLeft + book.offsetWidth * .5;
    const sourceY = book.offsetTop + book.offsetHeight * .48;
    const left = stack.offsetLeft + 12;
    const right = stack.offsetLeft + stack.offsetWidth - 12;
    const top = stack.offsetTop + 32;
    const bottom = stack.offsetTop + display.offsetHeight;
    const scanTop = stack.offsetTop + 8;
    const scanDistance = Math.max(1, sourceY - scanTop);
    const set = (id, attrs) => {
      const node = document.getElementById(id);
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
    };
    projector.setAttribute('viewBox', `0 0 ${scene.clientWidth} ${scene.clientHeight}`);
    projector.style.setProperty('--source-x', sourceX + 'px');
    projector.style.setProperty('--source-y', sourceY + 'px');
    display.style.setProperty('--source-gap', Math.max(0, sourceY - bottom) + 'px');
    scene.style.setProperty('--sweep-left', left + 'px');
    scene.style.setProperty('--sweep-width', right - left + 'px');
    scene.style.setProperty('--sweep-source', sourceY + 'px');
    scene.style.setProperty('--sweep-rise', -scanDistance + 'px');
    scene.style.setProperty('--sweep-duration', sweepDuration + 'ms');
    // Reveal each layer as the light crosses its bottom, then let its depth settle.
    // Measuring layout rather than transformed bounds also keeps text zoom reliable.
    [...panels[index].children].forEach(layer => {
      let layerTop = 0;
      for (let node = layer; node && node !== scene; node = node.offsetParent) {
        layerTop += node.offsetTop;
      }
      const delay = Math.max(0, (sourceY - layerTop - layer.offsetHeight) / scanDistance * sweepDuration);
      const duration = Math.max(50, layer.offsetHeight / scanDistance * sweepDuration);
      layer.style.setProperty('--reveal-delay', delay + 'ms');
      layer.style.setProperty('--reveal-duration', duration + 'ms');
      layer.style.setProperty('--settle-duration', duration + resolveDuration + 'ms');
    });
    set('beam-volume', {d:`M ${left} ${top} L ${right} ${top} L ${sourceX + 5} ${sourceY} L ${sourceX - 5} ${sourceY} Z`});
    set('beam-left', {d:`M ${left} ${top} L ${sourceX} ${sourceY}`});
    set('beam-center', {d:`M ${sourceX} ${top + 80} L ${sourceX} ${sourceY}`});
    set('beam-right', {d:`M ${right} ${top} L ${sourceX} ${sourceY}`});
    set('source-halo', {cx:sourceX, cy:sourceY, rx:book.offsetWidth * .18, ry:book.offsetHeight * .14});
    set('source-ring', {cx:sourceX, cy:sourceY, rx:book.offsetWidth * .115, ry:book.offsetHeight * .043});
    const halfSpine = book.offsetHeight * .19;
    set('source-spine', {d:`M ${sourceX} ${sourceY - halfSpine} L ${sourceX} ${sourceY + halfSpine}`});
    set('source-core', {d:`M ${sourceX} ${sourceY - halfSpine * .8} L ${sourceX} ${sourceY + halfSpine * .8}`});
  }

  function applyMotion() {
    const reduced = quietMotion || systemMotion.matches;
    document.body.classList.toggle('reduce-motion', reduced);
    motionToggle.setAttribute('aria-pressed', String(reduced));
    motionToggle.disabled = systemMotion.matches;
    motionToggle.textContent = systemMotion.matches ? '動き：端末の設定に合わせる' : reduced ? '動き：ひかえめ' : '動きをひかえめに';
  }

  function showPage(nextIndex, announce = true) {
    index = nextIndex;
    panels.forEach((panel, number) => { panel.hidden = number !== index; });
    dots.forEach((dot, number) => {
      if (number === index) dot.setAttribute('aria-current', 'page');
      else dot.removeAttribute('aria-current');
    });
    const number = String(index + 1).padStart(2, '0');
    count.replaceChildren(document.createTextNode(number + ' '));
    const total = document.createElement('span');
    total.textContent = '/ 03';
    count.append(total);
    bookNumber.textContent = number;
    alignProjection();
    if (announce) announcement.textContent = `${index + 1} / 3 ページ：${names[index]}`;
  }

  async function turnTo(target, direction) {
    const nextIndex = (target + panels.length) % panels.length;
    if (busy || nextIndex === index) return;
    scene.classList.remove('projector-starting');
    busy = true;
    display.setAttribute('aria-busy', 'true');
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-disabled', 'true'));
    // Keep keyboard focus out of a panel that is about to become hidden.
    if (panels[index].contains(document.activeElement)) {
      document.getElementById(direction > 0 ? 'next' : 'previous').focus({preventScroll:true});
    }
    try {
      if (quietMotion || systemMotion.matches) {
        showPage(nextIndex);
      } else {
        scene.classList.add(direction > 0 ? 'turn-forward' : 'turn-back', 'leaving');
        await wait(220);
        showPage(nextIndex);
        scene.classList.remove('leaving');
        scene.classList.add('arriving');
        await wait(entryDuration);
      }
      // Page changes stay within this prototype and never create a new history entry.
      history.replaceState(null, '', '#' + panels[index].id);
    } finally {
      scene.classList.remove('leaving', 'arriving', 'turn-forward', 'turn-back');
      display.setAttribute('aria-busy', 'false');
      controls.querySelectorAll('button').forEach(button => button.removeAttribute('aria-disabled'));
      busy = false;
    }
  }

  document.getElementById('previous').addEventListener('click', () => turnTo(index - 1, -1));
  document.getElementById('next').addEventListener('click', () => turnTo(index + 1, 1));
  dots.forEach(dot => dot.addEventListener('click', () => {
    const target = Number(dot.dataset.page);
    turnTo(target, target > index ? 1 : -1);
  }));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input,textarea,select,[contenteditable]')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    turnTo(index + direction, direction);
  });
  scene.addEventListener('touchstart', event => {
    if (event.touches.length !== 1 || event.target.closest('a,button')) { touchStart = null; return; }
    const touch = event.touches[0];
    touchStart = {x:touch.clientX,y:touch.clientY};
  }, {passive:true});
  scene.addEventListener('touchend', event => {
    if (!touchStart || event.changedTouches.length !== 1) { touchStart = null; return; }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const direction = dx < 0 ? 1 : -1;
      turnTo(index + direction, direction);
    }
  }, {passive:true});
  scene.addEventListener('touchcancel', () => { touchStart = null; }, {passive:true});
  motionToggle.addEventListener('click', () => { quietMotion = !quietMotion; applyMotion(); });
  systemMotion.addEventListener('change', applyMotion);
  window.addEventListener('hashchange', () => {
    const target = panels.findIndex(panel => '#' + panel.id === location.hash);
    if (target >= 0 && target !== index) turnTo(target, target > index ? 1 : -1);
  });
  controls.hidden = false;
  hint.hidden = false;
  motionToggle.hidden = false;
  applyMotion();
  showPage(index, false);
  if ('ResizeObserver' in window) {
    const layoutObserver = new ResizeObserver(alignProjection);
    layoutObserver.observe(scene);
    layoutObserver.observe(display);
  } else {
    window.addEventListener('resize', alignProjection);
  }
  scene.classList.add('projector-starting');
  setTimeout(() => scene.classList.remove('projector-starting'), entryDuration);
})();
