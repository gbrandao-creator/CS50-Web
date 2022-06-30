from django.test import TestCase

from .models import Post, User, Follower

# Create your tests here.

class PostsTestCase(TestCase):
    
    def setUp(self):

        # Create Users.
        u1 = User.objects.create(username="test", password="123")
        u2 = User.objects.create(username="test2", password="123")
        u3 = User.objects.create(username="test3", password="123")

        # Create posts.
        Post.objects.create(content='test_content', owner=u1)
        Post.objects.create(content='test_content 2', owner=u2)
        Post.objects.create(content='test_content 3', owner=u3)

        # Create followers.
        Follower.objects.create(user=u1, following_user=u2)
        Follower.objects.create(user=u1, following_user=u3)
        Follower.objects.create(user=u2, following_user=u3)

    def test_followers_count(self):
        u1 = User.objects.get(username="test")
        u2 = User.objects.get(username="test2")
        u3 = User.objects.get(username="test3")

        self.assertEqual(u1.followers.count(), 0)
        self.assertEqual(u2.followers.count(), 1)
        self.assertEqual(u3.followers.count(), 2)
    
    def test_following_count(self):
        u1 = User.objects.get(username="test")
        u2 = User.objects.get(username="test2")
        u3 = User.objects.get(username="test3")

        self.assertEqual(u1.following.count(), 2)
        self.assertEqual(u2.following.count(), 1)
        self.assertEqual(u3.following.count(), 0)



        
