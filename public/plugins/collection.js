function removeItem(element) {
    let $element = $(element);
    let $container = $($element.parents('.widget-item').first());
    $container.remove();
}
function addItem(element) {
    let $element = $(element);
    let $container = $($element.parents('.widget-container').first());
    let proto = $container.data('prototype');
    let index = $container.find('.widget-item').length;
    let newWidget = proto.replace(/__name__/g, index);
    $(newWidget).insertBefore($element);
    return false;
}