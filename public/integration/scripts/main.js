// UI
function showAsside(element) {
    $($(element).data('target')).toggleClass('open')
}

function prepareRemove(element) {
    console.log(element);
    dispatchPrepareRemoveEvent();
}

(function ($) {
    const app = new Application();
    app.boot();
    document.addEventListener('userConnectedEvent', function () {
        app.next();
    })
    //teaserEndedEvent
    document.addEventListener('teaserEndedEvent', function () {
        app.next();
    })
})($);
