/* Javascript for FeedbackXBlock. */
function FeedbackXBlock(runtime, element) {

    function init() {

        var handlerUrl = runtime.handlerUrl(element, 'update_scores');
        $.post(handlerUrl, '{}').done(function(response) {
            if (response.result === 'success') {
                $('.comment-feedback', element).toggleClass('hidden', hideComment(response['skills_score'], response['course_score']));

                if (response['comment']) {
                    $('#feedback-comment', element).val(response['comment']);

                    $(".skills .star", element).removeClass('selected');
                    $("#skills"+response['skills_score'], element).addClass('selected');
                   
                    $(".course .star", element).removeClass('selected');
                    $("#course"+response['course_score'], element).addClass('selected');
                }
            }
            else {
                 console.log('Error !');
            }
        });
    }

    function hideComment(skills_score, course_score) {
        if ((skills_score > 0 && skills_score <= 2) || (course_score > 0 && course_score <= 2))
            return false;
        else
            return true;
    }

    $(function () {

        init();

        var skillsStars = $('.skills .star', element);

        skillsStars.on('click', function () {
            skillsStars.removeClass('selected');
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $(this).data('value');
            var data = {'skills_score': value};

            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    $('.comment-feedback', element).toggleClass('hidden', hideComment(response['skills_score'], response['course_score']));
                } else {
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
            var data = {'course_score': value};

            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    $('.comment-feedback', element).toggleClass('hidden', !hideComment(response['skills_score'], response['course_score']));
               } else {
                     console.log('Error !');
                }
            });
        });

        var comment = $('.back-to-parcours');
        comment.on('click', function () {
            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $("#feedback-comment", element).val();
            var data = {'comment': value};

            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {

                } else {
                     console.log('Error !');
                }
            });
        });
    });
}
