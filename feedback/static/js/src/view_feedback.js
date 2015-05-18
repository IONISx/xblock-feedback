/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudent(runtime, element) {

    function init() {
        var handlerUrl = runtime.handlerUrl(element, 'update_scores');
        $.post(handlerUrl, '{}').done(function (response) {
            if (response.result === 'success') {
                $('.comment-feedback', element).toggleClass('hidden',
                    hideComment(response.skillsScore, response.courseScore, response.maxScore));

                /* init stars */
                nbStars = response.maxScoreRange;
                skills = $('.rating .skills', element);
                course = $('.rating .course', element);

                /*init comment field*/
                if (response.comment) {
                    $('#feedback-comment', element).val(response.comment);
                }
            }
            else {
                console.log('Error !');
            }
        });
    }

    function hideComment(skillsScore, courseScore, maxScore) {
        if ((skillsScore > 0 && skillsScore <= maxScore / 2) || (courseScore > 0 && courseScore <= maxScore /2)) {
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
