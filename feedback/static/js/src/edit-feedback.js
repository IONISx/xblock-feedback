/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudio(runtime, element) {
    $(element).find('.save-button').bind('click', function () {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        var data = {
            'exitLabel': $('#editFeedbackSettingsExitLabel', element).val(),
            'postUrl': $('#editFeedbackSettingsPostUrl', element).val(),
            'maxScore': $('#editFeedbackSettingsMaxScore', element).val(),
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
