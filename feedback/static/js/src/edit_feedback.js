/* Javascript for FeedbackXBlock. */
function FeedbackXBlockStudio(runtime, element) {
    $(element).find('.save-button').bind('click', function () {
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        var data = {
            'exitLabel': $('#exitLabel', element).val(),
            'postUrl': $('#postUrl', element).val(),
            'maxScore': $('#maxScore', element).val(),
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
