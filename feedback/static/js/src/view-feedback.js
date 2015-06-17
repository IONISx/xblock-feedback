/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudent(runtime, element) {
    function init() {
        var handlerUrl = runtime.handlerUrl(element, 'update_scores');
        $.post(handlerUrl, '{}').done(function (response) {
            if (response.result === 'success') {
                var skills = response['skills_score'];
                var course = response['course_score'];
                var max = response['max_score'];

                $('.comment-feedback', element).toggleClass('hidden',
                    hideComment(skills, course, max));
            }
            else {
                runtime.notify('error',  {
                    title: 'Error : Init failed.',
                    message: 'An error occured while loading the feedback form !'
                });
            }
        });
    }

    function hideComment(skillsScore, courseScore, maxScore) {
        return !((skillsScore > 0 && skillsScore <= maxScore / 2) ||
            (courseScore > 0 && courseScore <= maxScore / 2));
    }

    $(function () {
        init();

        var skillsRating = $('.skills .xblock-feedback-rating', element);
        var courseRating = $('.course .xblock-feedback-rating', element);
        var maxScore = $('input[name=max_score]', element);
        var all = skillsRating.add(courseRating);

        all.rating({
            glyphicon: false,
            ratingClass: 'rating-fa',
            showCaption: false,
            showClear: false
        });

        all.on('rating.change', function () {
            var score = {
                skills: skillsRating.val(),
                course: courseRating.val(),
                max: maxScore.val()
            };

            $('.comment-feedback', element).toggleClass(
                'hidden',
                hideComment(score.skills, score.course, score.max)
            );

            $.post(runtime.handlerUrl(element, 'update_scores'), JSON.stringify({
                skillsScore: score.skills,
                courseScore: score.course
            })).done(function (response) {
                if (response.result !== 'success') {
                    runtime.notify('error',  {
                        title: 'Error : Update failed.',
                        message: 'An error occured while saving course score !'
                    });
                }
            });
        });

        var form = $('form', element);
        form.on('submit', function (e) {
            e.preventDefault();
            form.off('submit');

            var handlerUrl = runtime.handlerUrl(element, 'save_feedback');
            var data = {
                comment: $('textarea[name=comment]', element).val()
            };

            $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
                if (response.result === 'success') {
                    form.submit();
                }
                else {
                    runtime.notify('error',  {
                        title: 'Error : Save failed.',
                        message: 'An error occured while saving feedback !'
                    });
                }
            });
        });
    });
}
