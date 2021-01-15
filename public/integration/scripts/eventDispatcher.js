function dispatchScoreEvent() {
    const event = document.createEvent('Event');
    event.initEvent('score', true, true);
    document.dispatchEvent(event);
}
function dispatchGameChangeEvent() {
    const event = document.createEvent('Event');
    event.initEvent('gamechanged', true, true);
    document.dispatchEvent(event);
}
function dispatchPrepareRemoveEvent() {
    const event = document.createEvent('Event');
    event.initEvent('prepareRemove', true, true);
    document.dispatchEvent(event);
}

