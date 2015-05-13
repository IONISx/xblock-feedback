/* Javascript for FeedbackXBlock. */
function FeedbackXBlock(runtime, element) {
    function init() {
        var handlerUrl = runtime.handlerUrl(element, 'update_scores');
        $.post(handlerUrl, '{}').done(function (response) {
            if (response.result === 'success') {
                $('.comment-feedback', element).toggleClass('hidden',
                    hideComment(response.skillsScore, response.courseScore));

                if (response.comment) {
                    $('#feedback-comment', element).val(response.comment);

                    $('.skills .star', element).removeClass('selected');
                    $('#skills' + response.skillsScore, element).addClass('selected');

                    $('.course .star', element).removeClass('selected');
                    $('#course' + response.courseScore, element).addClass('selected');
                }
            }
            else {
                console.log('Error !');
            }
        });
    }

    function hideComment(skillsScore, courseScore) {
        if ((skillsScore > 0 && skillsScore <= 2) || (courseScore > 0 && courseScore <= 2)) {
            return false;
        }
        else {
            return true;
        }
    }

    $(function () {
        init();

        var skillsStars = $('.skills .star', element);

        skillsStars.on('click', function () {
            skillsStars.removeClass('selected');
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $(this).data('value');
            var data = { 'skillsScore': value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    $('.comment-feedback', element).toggleClass('hidden',
                        hideComment(response.skillsScore, response.courseScore));
                }
                else {
                    console.log('Error !');
                }
            });
        });

        var courseStars = $('.course .star', element);

        courseStars.on('click', function () {
            courseStars.removeClass('selected');
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $(this).data('value');
            var data = { 'courseScore': value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    $('.comment-feedback', element).toggleClass('hidden',
                        hideComment(response.skillsScore, response.courseScore));
                }
                else {
                    console.log('Error !');
                }
            });
        });

        var comment = $('.back-to-parcours');
        comment.on('click', function () {
            var handlerUrl = runtime.handlerUrl(element, 'save_feedback');
            var value = $('#feedback-comment', element).val();
            var data = { 'comment': value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                }
                else {
                    console.log('Error !');
                }
            });
        });
    });
}
