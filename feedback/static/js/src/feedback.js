/* Javascript for FeedbackXBlock. */
function FeedbackXBlock(runtime, element) {
    $(function () {
        
        var skills_stars = $('.skills .star');

        skills_stars.on('click', function () {
            skills_stars.removeClass('selected');    
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var data = {'skills_score': $(this).attr("value")};

            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    console.log(JSON.stringify(data));
                    // Reload the whole page :
                    // window.location.reload(false);
                } else {
                     console.log("Error !");
                }
            });
        });

        var course_stars = $('.course .star');
        
        course_stars.on('click', function () {
            course_stars.removeClass('selected');    
            $(this).addClass('selected');

            var handlerUrl = runtime.handlerUrl(element, 'update_scores');
            var data = {'course_score': $(this).attr("value")};
            $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                if (response.result === 'success') {
                    console.log(JSON.stringify(data));
                    // Reload the whole page :
                    // window.location.reload(false);
                } else {
                     console.log("Error !");
                }
            });
        });
    });
}
