import getCookie from 'posts.js'

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.like').forEach(button => {
        button.addEventListener('click', likePost)
    })

    function likePost(event){
        post = event.currentTarget.closest('.post');
        postId = post.querySelector('.edit-post-form').elements['post-id'].value;
        
        const csrftoken = getCookie('csrftoken');

        
            fetch(`/like/${postId}`, {
                credentials: 'include',
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    like: true
                })
            })
    }
})