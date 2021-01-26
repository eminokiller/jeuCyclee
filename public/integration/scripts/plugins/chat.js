(function ($) {
    $.fn.chat = function (config, WS) {
        const defaultConfig = {
            'chatTeam': [],
            'chatRoom': '',
            'chatSearch': '',
            'chatConsole': '',
            'memberMapFn': function (member) {
                return {
                    'id': '',
                    'picUrl': '',
                    'username': '',
                };
            }
        };
        const current = $.extend(defaultConfig, config);

        function getMemberTemplate(member) {
            return `<li data-id="${member.id}" class="chat-room-item team-member">
                                        <div class="topic-item">
                                            <div class="team-member-pic-container">
                                                <div class="pic-container">
                                                    <img alt="FCK" src="${member.picUrl}">
                                                </div>
                                            </div>
                                            <div class="team-member-message-widget">
                                                <div class="team-member-name">${member.username}</div>
                                                <div class="team-message-message" data-id="${member.id}">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab
                                                        amet autem eius in labore neque nobis, quam quibusdam quidem
                                                        quis quisquam quo reiciendis repellat saepe sint soluta
                                                        suscipit! Architecto?</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>`;
        }

        function search(element, term) {

        }
        function sendMessage(message) {

        }

        this.each(function () {
            let _that = this;
            current['chatTeam'].forEach(function (member) {
                $(current['chatRoom']).html('');
                $(current['chatRoom']).append(getMemberTemplate(current['memberMapFn'](member)));

            })
            $(current['chatSearch']).bind('submit', function (evt) {
                evt.preventDefault();
                let $target = $(evt.target);
                let data = $target.serialize();
                const url = new URL(`/test/me.php?${data}`,'http://example.com');
                let q = url.searchParams.get('q');
                search(_that, q);
            })
            $(current['chatConsole']).bind('submit', function (evt) {
                evt.preventDefault();

                let $target = $(evt.target);
                let data = $target.serialize();
                let urlString = `/test/me.html?${data}`;
                const url = new URL(urlString, 'http://example.com');
                let message = url.searchParams.get('message');
                sendMessage(message);
            })
            _that.addEventListener('messagePosted', function (evt) {
                let data = JSON.parse(evt.data);
                if (data.id) {
                    if (data.message) {
                        $($($(current['chatRoom']).find('div.team-message-message[data-id="' + data.id + '"]').first()).find('p').first()).append(data.message)
                    }
                }
            })


        })
    };
})($)
