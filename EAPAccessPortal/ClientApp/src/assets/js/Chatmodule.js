$(".nano").nanoScroller({
    scroll: 'bottom',
    alwaysVisible: true
});
$(function () {
    var $chatbox = $('.chat-box');
    var $header = $('.online-user');
    var $player = $('.chat-area');
    var $content = $('.message-area');

    var $window = $(window).on('resize', function () {
        var height = $chatbox.height() - ($header.height() + $player.height() + 10);
        $content.height(height);

        $(".message-area").css("margin-top", $header.height());


    }).trigger('resize');
    $(".nano").nanoScroller({ scroll: 'bottom' });
});
//$(document).on('click',".user-modal, .close-modal",function() {	
