/* Javascript for FeedbackXBlock. */
function FeedbackXBlock(runtime, element) {
    $(function () {
        
        var skillsStars = $('.skills .star');

        skillsStars.on('click', function () {
            skillsStars.removeClass('selected');    
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $(this).data('value');
            var data = {'skills_score': value};


            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    if (value > 2)
                        $('.comment-feedback').hide();
                    else 
                        $('.comment-feedback').show();
                } else {
                     console.log('Error !');
                }
            });
        });

        var courseStars = $('.course .star');
        
        courseStars.on('click', function () {
            courseStars.removeClass('selected');    
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var value = $(this).data('value');
            var data = {'course_score': value};

            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    if (value > 2)
                        $('.comment-feedback').hide();
                    else 
                        $('.comment-feedback').show();
                } else {
                     console.log('Error !');
                }
            });
        });

        $('.back-to-parcours save-button').on('click', function () {
            var handlerUrl = runtime.handlerUrl(element, 'save_feedback');
            var value = $("feedback-comment").attr("data-value")
            var data = {'comment': value};

            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    console.log(JSON.stringify(data));                      
                } else {
                     console.log('Error !');
                }
            });
        }); 
    });
}
