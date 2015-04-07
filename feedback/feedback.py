"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from django.template import Context, Template, Library

from xblock.core import XBlock
from xblock.fields import Scope, Integer, List, String
from xblock.fragment import Fragment

class FeedbackXBlock(XBlock):

    """
    TO-DO: document what your XBlock does.
    """

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

    comment = String (
        default="",
        scope=Scope.user_state,
        help="Comment available if a note is below 3.",
    )
    '''
    Util functions
    '''

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def load_resource(self, resource_path):
        """
        Gets the content of a resource
        """
        resource_content = pkg_resources.resource_string(__name__, resource_path)
        return resource_content.decode("utf8")

    def render_template(self, template_path, context={}):
        """
        Evaluate a template by resource path, applying the provided context
        """
        template_str = self.load_resource(template_path)
        return Template(template_str).render(Context(context))

    def student_view(self, context=None):
        """
        The primary view of the FeedbackXBlock, shown to students
        when viewing courses.
        """
        context = {
            'skills_score': self.skills_score,
            'course_score': self.course_score,
            'comment': self.comment
        }

        context['stars'] = [4,3,2,1]
        
        html = self.render_template("static/html/feedback.html", context)

        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/feedback.css"))
        frag.add_javascript(self.resource_string("static/js/src/feedback.js"))
        frag.initialize_js('FeedbackXBlock')
        return frag

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
        TODO : Verify that all fields are saved and redirect to Parcours
        """
        if data.get('comment'):
            self.comment = data['comment']

        return {
            'result': 'success',
        }

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
