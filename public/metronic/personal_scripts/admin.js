/**
 * @param date
 * @param format
 * @returns {*}
 */
function formatDate(date, format) {
    console.log('date'+ moment(date).format("DD-MM-YYYY"));
    let formattedDate;
    switch (format) {
        case 'long':
            formattedDate = moment(date).format('LLLL');
            break;
        case 'long1':
            formattedDate = moment(date).format('LL');
            break;
    }
    console.log('formattedDate'+formattedDate);
    return formattedDate;
}

/**
 * @param data
 * @returns {*}
 */
function renderMenu(data) {
    let menu = '';

    // Building link
    $.each(data, function (i, v) {
        if (v.delete) {

            // List of events (onClick, onKeyUp, etc ...)
            let extraData = '';
            if (v.extraData) {
                $.each(v.extraData, function (x, y) {
                    extraData += x.toString() + " = " + "\"" + y + "\"";
                });
            }
            menu += '<a ' +
                'data-id="' + v.dataId + '" ' +
                'href="javascript:void(0);" ' +
                'data-href="' + v.route + '" ' +
                'class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" ' +
                'title="' + v.title + '" ' +
                '' + extraData + '' +
                '>' +
                '<i class="' + v.icon + '"></i>' +
                '</a>';
        } else if (v.checkbox) {
            menu += '<label class="m-checkbox" style="margin-bottom: 1rem !important;"> <input type="checkbox" data-id="' + v.dataId + '" title="' + v.title + '" ' + v.checked + '><span></span></label>';
        } else {
            // List of events (onClick, onKeyUp, etc ...)
            let extraData = '';
            if (v.extraData) {
                $.each(v.extraData, function (x, y) {
                    extraData += x.toString() + " = " + "\"" + y + "\"";
                });
            }
            menu += '<a ' +
                'data-id="' + v.dataId + '" ' +
                'href="' + v.route + '" ' +
                'class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill" ' +
                'title="' + v.title + '" ' +
                '' + extraData + '' +
                '>' +
                '<i class="' + v.icon + '"></i>' +
                '</a>';
        }
    });

    return menu;
}

/**
 * @param elm
 */
function deleteElement(elm) {
    let href = elm.getAttribute('data-href');
    let deleteTitle = elm.getAttribute('deleteTitle');
    let deleteMsg = elm.getAttribute('deleteMsg');
    let cancelBtn = elm.getAttribute('cancelBtn');
    let confirmBtn = elm.getAttribute('confirmBtn');

    swal({
        title: deleteTitle,
        text: deleteMsg,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: cancelBtn,
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: confirmBtn,
        confirmButtonClass: 'btn btn-success',
        reverseButtons: true
    }).then(function (e) {
        if (!e.value) return;
        console.log(href);
        $.ajax({
            url: href,
            type: "GET",
            dataType: "json",
            success: function (xhr) {
                console.log(xhr);
                swal(
                    xhr.title,
                    xhr.msg,
                    xhr.back_type
                );
                dispatchReloadDt();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                swal(
                    xhr.title,
                    xhr.msg,
                    xhr.back_type
                );
            }
        });
    });
}
function changeStatusUser(elm) {
    let href = elm.getAttribute('data-href');
    let deleteTitle = elm.getAttribute('deleteTitle');
    let deleteMsg = elm.getAttribute('deleteMsg');
    let cancelBtn = elm.getAttribute('cancelBtn');
    let confirmBtn = elm.getAttribute('confirmBtn');

    swal({
        title: deleteTitle,
        text: deleteMsg,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: cancelBtn,
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: confirmBtn,
        confirmButtonClass: 'btn btn-success',
        reverseButtons: true
    }).then(function (e) {
        if (!e.value) return;
        console.log(href);
        $.ajax({
            url: href,
            type: "GET",
            dataType: "json",
            success: function (xhr) {
                console.log(xhr);
                swal(
                    xhr.title,
                    xhr.msg,
                    xhr.back_type
                );
                dispatchReloadDt();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr);
                swal(
                    xhr.title,
                    xhr.msg,
                    xhr.back_type
                );
            }
        });
    });
}

/**
 * Reload DataTable after Action
 */
function dispatchReloadDt() {
    table.ajax.reload();
}

/**
 * Render specialities
 * @param data
 * @returns {string}
 */
function renderSpecialites(data) {
    let s = '';
    $.each(data, function (i, v) {
        s += '- ' + v.libelleAr + '<br/>';
    });
    return s;
}
