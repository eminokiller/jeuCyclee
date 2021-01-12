ajaxInterceptor = function (config) {
    let defaultConfig = {
        mocks: true,
        data: '',
        url: '',
        method: 'GET',
        success: function (response) {

        },
        error: function (error) {

        }
    };
    let current = $.extend(defaultConfig, config);
    let routes = [
        {
            'regex': "/\\/getQuestion\\/(\\d+)$/",
            'method': 'GET',
            'ok': function () {
                return `<form name="question" method="post">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!---------->
                <div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label class="form-check-label" for="exampleRadios1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
  <label class="form-check-label" for="exampleRadios2">
    Second default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
  <label class="form-check-label" for="exampleRadios3">
    Disabled radio
  </label>
</div>
                <!------------>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </form>`;
            },
            'ko': function () {

                return `zizo`;
            }
        },
        {
            'regex': "/\\/getQuestion\\/(\\d+)$/",
            'method': 'POST',
            'ok': function () {
                return `wyz`;
            },
            'ko': function () {
                return `zizo`;
            }
        },
    ];

    let routeCollection = routes.filter(function (item) {
        return item['method'] === current['method'] && eval(item['regex']).test(current['url'])
    })

    if (routeCollection.length) {
        setTimeout(function () {
            current['success'](routeCollection[0]['ok']())
        }, 100)
    } else {
        current['error'](new Error())
    }


};
