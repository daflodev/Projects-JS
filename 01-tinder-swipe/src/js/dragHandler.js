let isDragging = {
    isAnimation: false,
    pullDeltaX: 0
};

export function startDrag(e) {
    if (isDragging.isAnimation) return;

    const actualCard = e.target.closest('article');
    if (!actualCard) return;

    const startX = e.pageX || e.touches[0].pageX;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });

    function onMove(e) {
        const currentX = e.pageX || e.touches[0].pageX;
        isDragging.pullDeltaX = currentX - startX;

        if (isDragging.pullDeltaX === 0) return;

        isDragging.isAnimation = true;
        const deg = isDragging.pullDeltaX / 10;
        actualCard.style.transform = `translateX(${isDragging.pullDeltaX}px) rotate(${deg}deg)`;
        actualCard.style.cursor = 'grabbing';

        const opacity = Math.abs(isDragging.pullDeltaX) / 100;
        const choiceElement = isDragging.pullDeltaX > 0 ? actualCard.querySelector('.choice.like') : actualCard.querySelector('.choice.nope');
        choiceElement.style.opacity = opacity;
    }

    function onEnd() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);

        resetCardPosition(isDragging.pullDeltaX, actualCard);
        isDragging.pullDeltaX = 0;
        isDragging.isAnimation = false;
    }
}

export function resetCardPosition(pullDeltaX, actualCard) {
    const decisionMade = Math.abs(pullDeltaX) >= 75;
    if (decisionMade) {
        actualCard.classList.add(pullDeltaX >= 0 ? 'go-right' : 'go-left');
        actualCard.addEventListener('transitionend', () => {
            actualCard.remove();
        });
    } else {
        actualCard.classList.add('reset');
        actualCard.classList.remove('go-right', 'go-left');
        actualCard.querySelectorAll('.choice').forEach(el => {
            el.style.opacity = 0;
        });
    }

    actualCard.addEventListener('transitionend', () => {
        actualCard.removeAttribute('style');
        actualCard.classList.remove('reset');
    });
}
