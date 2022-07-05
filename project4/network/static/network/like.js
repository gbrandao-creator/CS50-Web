document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.like').forEach(button => {
        if(! button.className.includes('disabled')){
            button.addEventListener('click', likePost);
        }
    })

    function likePost(event){
        event.preventDefault();

        const post = event.currentTarget.closest('.post');
        const postId = post.querySelector('.edit-post-form').elements['post-id'].value;
        const csrftoken = getCookie('csrftoken');

        // Fetch API to check whether post is liked or not
        fetch(`/is-liked/${postId}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(res => {
            // If post is not liked, then like post.
            if(!res['is_liked']){ 
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
                .then(response => response.json())
                .then(res => console.log(res));
                post.querySelector('.svg-path').style.fill = '#ed1b24';
                post.querySelector('.likes-count').innerHTML = parseInt(post.querySelector('.likes-count').innerHTML) + 1;
            }
            else {
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
                        like: false
                    })
                })
                .then(response => response.json())
                .then(res => console.log(res));

                post.querySelector('.svg-path').style.fill = '#cccccc';
                post.querySelector('.likes-count').innerHTML = parseInt(post.querySelector('.likes-count').innerHTML) - 1;
            }

        });


        /*fetch(`/like/${postId}`, {
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
        .then(res => console.log(res));*/
    }

    // Get csrf_token cookie. 
    // Reference: https://docs.djangoproject.com/en/3.1/ref/csrf/#ajax


    function reset_animation(element) {
        element.style.animation = 'none';
        element.offsetHeight; /* trigger reflow */
        element.style.animation = 'changeColor';
    }

    function getCookie(name) {
        let cookieValue = null;
    
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
    
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    
                    break;
                }
            }
        }
    
        return cookieValue;
    }
})