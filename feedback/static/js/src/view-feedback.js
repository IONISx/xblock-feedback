/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudent(runtime, element) {
    function init() {
        var handlerUrl = runtime.handlerUrl(element, 'update_scores');
        $.post(handlerUrl, '{}').done(function (response) {
            if (response.result === 'success') {
                $('.comment-feedback', element).toggleClass('hidden',
                    hideComment(response['skills_score'], response['course_score'], response['max_score']));
            }
            else {
                console.log('Error !');
                runtime.notify('error',  {
                    title: 'Error : xblock.ionisx.feedback.update_scores failed.',
                    message: 'An error occured while fulfilling the feedback form !'
                });
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
            var data = { skillsScore: value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    $('input[name=skills_score]').val(value);
                    $('.comment-feedback', element).toggleClass('hidden',
                        hideComment(response['skills_score'], response['course_score'], response['max_score']));
                }
                else {
                    console.log('Error !');
                    runtime.notify('error',  {
                        title: 'Error : xblock.ionisx.feedback.update_scores failed.',
                        message: 'An error occured while saving skills score !'
                    });
                }
            });
        });

        var courseStars = $('.course .star', element);

        courseStars.on('click', function () {
            courseStars.removeClass('selected');
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $(this).data('value');
            var data = { courseScore: value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    $('input[name=course_score]').val(value);
                    $('.comment-feedback', element).toggleClass('hidden',
                        hideComment(response['skills_score'], response['course_score'], response['max_score']));
                }
                else {
                    console.log('Error !');
                    runtime.notify('error',  {
                        title: 'Error : xblock.ionisx.feedback.update_scores failed.',
                        message: 'An error occured while saving course score !'
                    });
                }
            });
        });

        var comment = $('#xblock-feedback-form');
        comment.on('submit', function (e) {
            e.preventDefault();
            comment.off('submit');

            var handlerUrl = runtime.handlerUrl(element, 'save_feedback');
            var value = $('#xblock-feedback-comment-ta', element).val();
            var data = { comment: value };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    $('input[name=comment]').val(value);
                    comment.submit();
                }
                else {
                    console.log('Error !');
                    runtime.notify('error',  {
                        title: 'Error : xblock.ionisx.feedback.save_feedback failed.',
                        message: 'An error occured while saving feedback !'
                    });
                }
            });
        });
    });
}
