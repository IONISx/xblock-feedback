/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudio(runtime, element) {
    $(element).find('.save-button').bind('click', function () {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        var data = {
            exitLabel: $('#xblock-feedback-exit-label', element).val(),
            title: $('#xblock-feedback-title-label').val(),
            postUrl: $('#xblock-feedback-post-url', element).val(),
            maxScore: $('#xblock-feedback-max-score', element).val(),
            lock: $('#xblock-feedback-lock-when-voted option:selected').val()
        };

        runtime.notify('save', { state: 'start' });
        $.post(handlerUrl, JSON.stringify(data)).done(function (response) {
            if (response.result === 'success') {
                runtime.notify('save', { state: 'end' });
            }
            else {
                runtime.notify('error',  {
                    title: 'Error : save failed.',
                    message: 'An error occured !'
                });
            }
        });
    });

    $(element).find('.cancel-button').bind('click', function () {
        runtime.notify('cancel', {});
    });
}
