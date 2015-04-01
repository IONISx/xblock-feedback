"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, String, Float, Integer, List, Dict
from xblock.fragment import Fragment


class FeedbackXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.

    skills_score = Integer(
        default=0,
        scope=Scope.user_state,
        help="Score for auto-evaluated skills.",
    )

    course_score = Integer(
        default=0,
        scope=Scope.user_state,
        help="Score for auto-evaluated skills.",
    )

    

    # def get_anonymous_user_id(self, username, course_id):
    #     """
    #     Get the anonymous user id from Xblock user service.
    #     Args:
    #         username(str): user's name entered by staff to get info.
    #         course_id(str): course id.
    #     Returns:
    #         A unique id for (user, course) pair
    #     """
    #     return self.runtime.service(self, 'user').get_anonymous_user_id(username, course_id)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the FeedbackXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/feedback.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/feedback.css"))
        frag.add_javascript(self.resource_string("static/js/src/feedback.js"))
        frag.initialize_js('FeedbackXBlock')
        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def update_scores(self, data, suffix=''):
        """
        The saving handler.
        """
        if data.get('skills_score'):
            self.skills_score = data['skills_score'] 
        else:
            self.course_score = data['course_score']

        return {
            'result': 'success',
        }

    def save_feedback(self, data, suffix=''):
        """
        The saving handler.
        Verify that all fields are saved and redirect to Parcours
        """
        # if not self.course_id:
        #     self.course_id = self._serialize_opaque_key(self.xmodule_runtime.course_id)
        # if not self.user_id:
        #     self.user_id = self.scope_ids.user_id

        # if data['skills_score']:
        #     self.skills_score = data['skills_score'] 
        # else:
        #     self.course_score = data['course_score']

        return {
            'result': 'success',
        }

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("FeedbackXBlock",
             """<vertical_demo>
                <feedback/>
                </vertical_demo>
             """),
        ]
