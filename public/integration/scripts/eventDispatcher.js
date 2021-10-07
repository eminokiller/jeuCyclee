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

function dispatchDismissRemoveEvent() {
    const event = document.createEvent('Event');
    event.initEvent('dismissRemove', true, true);
    document.dispatchEvent(event);
}

function dispatchTimeElapsedEvent() {
    console.log('tile elepset')
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

function dispatchMasterSaveEvent() {
    const event = document.createEvent('Event');
    event.initEvent('masterSaveEvent', true, true);
    document.dispatchEvent(event);
}

function dispatchChangeLevelEvent() {
    const event = document.createEvent('Event');
    event.initEvent('changeLevelEvent', true, true);
    document.dispatchEvent(event);
}
//exampleModalBadge1
function showBage1Modal() {
    if (!$('#exampleModalBadge1').hasClass('done')) {
        $('#exampleModalBadge1').modal('toggle')
        $('#exampleModalBadge1').addClass('done')
    }
}

function showBage2Modal() {
    if (!$('#exampleModalBadge2').hasClass('done')) {
        $('#exampleModalBadge2').modal('toggle')
        $('#exampleModalBadge2').addClass('done')

    }

}

function showBage3Modal() {

    if (!$('#exampleModalBadge3').hasClass('done')) {
        $('#exampleModalBadge3').modal('toggle')
        $('#exampleModalBadge3').addClass('done')
    }

}

function activateBadge1() {
    $('#b1').addClass('active')
}
function activateBadge2() {
    $('#b2').addClass('active')
}
function activateBadge3() {
    $('#b3').addClass('active')
}

