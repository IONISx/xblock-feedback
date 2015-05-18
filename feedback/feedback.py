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

    max_score = Integer(
        default=4,
        scope=Scope.content,
        help="Max score / Number of stars.",
    )

    comment = String (
        default="",
        scope=Scope.user_state,
        help="Comment available if a note is below 3.",
    )

    post_url = String (
        default="#", #"s/parcours/track/g",
        scope=Scope.content,
        help="Post action url.",
    )

    exit_label = String (
        default="Save and exit",
        scope=Scope.content,
        help="Label for button exit.",
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
        The primary view of the XBlock, shown to students
        when viewing courses.
        """
        context = {
            'skillsScore': self.skills_score,
            'courseScore': self.course_score,
            'comment': self.comment,
            'postUrl': self.post_url,
            'maxScoreRange': list(reversed(range(self.max_score + 1))),
            'exitLabel': self.exit_label,
            'userId': self.runtime.user_id,
            'courseId': unicode(self.runtime.course_id),
        }

        html = self.render_template("static/html/view_feedback.html", context)

        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/feedback.css"))
        frag.add_javascript(self.resource_string("static/js/src/view_feedback.js"))
        frag.initialize_js('FeedbackXBlockStudent')
        return frag

    def studio_view(self, context=None):
        """
        The secondary view of the XBlock, shown to teachers
        when editing the XBlock.
        """
        context = {
            'postUrl': self.post_url,
            'maxScore': self.max_score,
            'exitLabel': self.exit_label,
        }

        html = self.render_template("static/html/edit_feedback.html", context)

        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/feedback.css"))
        frag.add_javascript(self.resource_string("static/js/src/edit_feedback.js"))
        frag.initialize_js('FeedbackXBlockStudio')
        return frag

    @XBlock.json_handler
    def update_scores(self, data, suffix=''):
        """
        The updating handler.
        """
        if data.get('skillsScore'):
            self.skills_score = data['skillsScore']
        if data.get('courseScore'):
            self.course_score = data['courseScore']
        if data.get('comment'):
            self.comment = data['comment']

        return {
            'result': 'success',
            'skillsScore': self.skills_score,
            'courseScore': self.course_score,
            'comment': self.comment,
        }

    @XBlock.json_handler
    def save_feedback(self, data, suffix=''):
        """
        The saving handler.
        """
        if data.get('comment'):
            self.comment = data['comment']
 
        event_type = 'ionisx.learning.course.feedback'
        event_data = {
            'skills_score': self.skills_score,
            'course_score': self.course_score,
            'comment': self.comment,
            'max_score': self.max_score,
        }

        self.runtime.publish(self, event_type, event_data)
        return {
            'result': 'success',
        }

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        """
        The saving handler.
        """
        self.exit_label = unicode(data['exitLabel'])
        self.post_url = unicode(data['postUrl'])
        self.max_score = unicode(data['maxScore'])

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
