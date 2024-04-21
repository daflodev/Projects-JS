import { startDrag } from './dragHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousedown', startDrag);
    document.addEventListener('touchstart', startDrag, { passive: true });
});
