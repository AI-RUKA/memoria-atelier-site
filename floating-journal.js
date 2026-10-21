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
  const systemMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const names = ['ようこそ', 'ページづくり', '保存の案内'];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  let index = Math.max(0, panels.findIndex(panel => '#' + panel.id === location.hash));
  let busy = false;
  let quietMotion = systemMotion.matches;
  let touchStart = null;

  function applyMotion() {
    document.body.classList.toggle('reduce-motion', quietMotion);
    motionToggle.setAttribute('aria-pressed', String(quietMotion));
    motionToggle.textContent = quietMotion ? '動き：ひかえめ' : '動きをひかえめに';
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
    if (announce) announcement.textContent = `${index + 1} / 3 ページ：${names[index]}`;
  }

  async function turnTo(target, direction) {
    const nextIndex = (target + panels.length) % panels.length;
    if (busy || nextIndex === index) return;
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
        await wait(270);
        showPage(nextIndex);
        scene.classList.remove('leaving');
        scene.classList.add('arriving');
        await wait(520);
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
  systemMotion.addEventListener('change', event => { quietMotion = event.matches; applyMotion(); });
  window.addEventListener('hashchange', () => {
    const target = panels.findIndex(panel => '#' + panel.id === location.hash);
    if (target >= 0 && target !== index) turnTo(target, target > index ? 1 : -1);
  });
  controls.hidden = false;
  hint.hidden = false;
  motionToggle.hidden = false;
  applyMotion();
  showPage(index, false);
})();
