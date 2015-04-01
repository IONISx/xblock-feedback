/* Javascript for FeedbackXBlock. */
function FeedbackXBlock(runtime, element) {

    $(function () {

        $("ul.notes-echelle").addClass("js");
        $("ul.notes-echelle li").addClass("note-off");
        
        $("ul.notes-echelle input")
            .focus(function() {
                $(this).parents("ul.notes-echelle").find("li").removeClass("note-focus");
                $(this).parent("li").addClass("note-focus");
                $(this).parent("li").nextAll("li").addClass("note-off");
                $(this).parent("li").prevAll("li").removeClass("note-off");
                $(this).parent("li").removeClass("note-off");
            })
            .blur(function() {
                $(this).parents("ul.notes-echelle").find("li").removeClass("note-focus");
                if($(this).parents("ul.notes-echelle").find("li input:checked").length == 0) {
                    $(this).parents("ul.notes-echelle").find("li").addClass("note-off");
                }
            })
            .click(function() {
                $(this).parents("ul.notes-echelle").find("li").removeClass("note-checked");
                $(this).parent("li").addClass("note-checked");
                console.log(runtime);
                var data = {};

                ($(this).attr("name") === "notesA") ? data = {'skills_score': $(this).val()} : data = {'course_score': $(this).val()} ;
                console.log (JSON.stringify(data));

                
                var handlerUrl = runtime.handlerUrl(element, 'update_scores');
                $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
                    console.log (response.result);
                        
                    if (response.result === 'success') {
                        // Reload the whole page :
                        // window.location.reload(false);
                    } else {
                        console.log ("an error occured");
                    }
                 });

            });
            
        $("ul.notes-echelle li").mouseover(function() {
            $(this).nextAll("li").addClass("note-off");
            $(this).prevAll("li").removeClass("note-off");
            $(this).removeClass("note-off");
        });
            
        $("ul.notes-echelle").mouseout(function() {
            $(this).children("li").addClass("note-off");
            $(this).find("li input:checked").parent("li").trigger("mouseover");
        });
        
        $("ul.notes-echelle input:checked").parent("li").trigger("mouseover");
        $("ul.notes-echelle input:checked").trigger("click");
        
    });
}
