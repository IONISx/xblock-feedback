/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudent(runtime, element) {
    function init() {
        var handlerUrl = runtime.handlerUrl(element, 'update_scores');
        $.post(handlerUrl, '{}').done(function (response) {
            if (response.result === 'success') {
                $('.comment-feedback', element).toggleClass('hidden',
                    hideComment(response.skillsScore, response.courseScore, response.maxScore));
            }
            else {
                console.log('Error !');
            }
        });
    }

    function hideComment(skillsScore, courseScore, maxScore) {
        return !((skillsScore > 0 && skillsScore <= maxScore / 2) || (courseScore > 0 && courseScore <= maxScore / 2));
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
                    $('input[name=skills_score]').val(value);
                    $('.comment-feedback', element).toggleClass('hidden',
                        hideComment(response.skillsScore, response.courseScore, response.maxScore));
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
                    $('input[name=course_score]').val(value);
                    $('.comment-feedback', element).toggleClass('hidden',
                        hideComment(response.skillsScore, response.courseScore, response.maxScore));
                }
                else {
                    console.log('Error !');
                }
            });
        });

        var comment = $('#xblock-feedback-form');
        comment.on('submit', function (e) {
            e.preventDefault();
            comment.off('submit');

            var handlerUrl = runtime.handlerUrl(element, 'save_feedback');
            var value = $('#xblock-feedback-comment-ta', element).val();
            var data = { 'comment': value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    $('input[name=comment]').val(value);
                    comment.submit();
                }
                else {
                    console.log('Error !');
                }
            });
        });

        var quit = $('.xblock-actions-when-locked-save-button');
        quit.on('click', function (e) {
            window.location.href = $('input[name=post_url]').val();
        });
    });
}
