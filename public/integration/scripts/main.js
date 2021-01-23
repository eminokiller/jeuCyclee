// UI
function showAsside(element) {
    $($(element).data('target')).toggleClass('open')
}

function prepareRemove(element) {
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
        localStorage.setItem('level', '1');
        app.next();
    })
})($);



