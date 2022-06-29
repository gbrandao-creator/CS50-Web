from django.test import TestCase

from .models import Post, User

# Create your tests here.

class PostsTestCase(TestCase):
    
    def setUp(self):

        #create Users.
        u1 = User.objects.create(username="test", password="test")
        u2 = User.objects.create(username="test2", password="test2")

        #create posts
        Post.objects.create(content='test_content', owner=u1)
        Post.objects.create(content='test_content 2', owner=u2)