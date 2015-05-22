/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudio(runtime, element) {
    $(element).find('.save-button').bind('click', function () {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        var data = {
            'exitLabel': $('#xblock-feedback-exit-label', element).val(),
            'postUrl': $('#xblock-feedback-post-url', element).val(),
            'maxScore': $('#xblock-feedback-max-score', element).val(),
            'lock': $('#xblock-feedback-lock-when-voted option:selected').val(),
            'introLabel': $('#xblock-feedback-intro-label', element).val(),
            'skillsLabel': $('#xblock-feedback-skills-label', element).val(),
            'courseLabel': $('#xblock-feedback-course-label', element).val(),
            'commentLabel': $('#xblock-feedback-comment-label', element).val(),
            'lockedIntroLabel': $('#xblock-feedback-locked-intro-label', element).val(),
            'lockedSkillsLabel': $('#xblock-feedback-locked-skills-label', element).val(),
            'lockedCourseLabel': $('#xblock-feedback-locked-course-label', element).val(),
            'lockedCommentLabel': $('#xblock-feedback-locked-comment-label', element).val(),
            'lockedExitLabel': $('#xblock-feedback-locked-exit-label', element).val()
        };

        runtime.notify('save', { state: 'start' });
        $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
            runtime.notify('save', { state: 'end' });
        });
    });

    $(element).find('.cancel-button').bind('click', function () {
        runtime.notify('cancel', {});
    });
}
