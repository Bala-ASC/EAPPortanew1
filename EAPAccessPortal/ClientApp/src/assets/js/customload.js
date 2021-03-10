$(".nano").nanoScroller({
    scroll: 'top',
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
    $(".user-modal, .close-modal").click(function () {
        $("#profile-modal").fadeToggle();
    });
});
//$(document).on('click',".user-modal, .close-modal",function() {	
