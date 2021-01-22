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
function dispatchTimeElapsedEvent() {
    const event = document.createEvent('Event');
    event.initEvent('timeElapsedEvent', true, true);
    document.dispatchEvent(event);
}

function dispatchUserConnectedEvent() {
    const event = document.createEvent('Event');
    event.initEvent('userConnectedEvent', true, true);
    document.dispatchEvent(event);
}
function dispatchTeaserEnded() {
    const event = document.createEvent('Event');
    event.initEvent('teaserEndedEvent', true, true);
    document.dispatchEvent(event);
}
