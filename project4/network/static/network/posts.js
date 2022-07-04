document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-post').forEach(button => {
        button.addEventListener('click', editPost)
    })

    function editPost(event){
        postContent = event.currentTarget.closest('.post').querySelector('.post-content');

        // Show form
        postContent.querySelector('.current-content').style.display = 'none';
        var form = postContent.querySelector('form');
        form.style.display = 'block';
        console.log(form);
        // Prepopulate form
        form.elements['content'].innerHTML = `${postContent.querySelector('.current-content').innerHTML}`;

        // By default, submit button is disabled
        saveButton = form.elements['save'];
        saveButton.disabled = true;

        // Enable submit only if there's text in content field
        formContent = form.elements['content'];
        formContent.onkeyup = () => {
            if (formContent.value.length > 0 && 
                formContent.value != postContent.querySelector('.current-content').innerHTML) {
                saveButton.disabled = false;   
                saveButton.addEventListener("click", handleSubmit);
            } else {
                saveButton.disabled = true;
                saveButton.removeEventListener("click", handleSubmit);
            }
        }

        form.elements['cancel'].addEventListener("click", handleCancel);
        
    }

    function handleCancel(event){
        const form = event.currentTarget.parentElement.parentElement;
        const postContent = form.parentElement;
        
        postContent.querySelector('.current-content').style.display = 'block';
        form.style.display = 'none';
    }

    function handleSubmit(event){
        var form = event.currentTarget.parentElement.parentElement;
        const postId = form.elements['post-id'].value;
        const formContent = form.elements['content'].value;
        const csrftoken = getCookie('csrftoken');
        
        fetch(`/edit/${postId}`, {
            credentials: 'include',
            method: 'PUT',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                content: formContent
            })
        })
        //.then(response => response.json())
        .then(res => {
            console.log(res);
            if(res['ok'] == true){
                form.parentElement.querySelector('.current-content').innerHTML = formContent;
                postContent.querySelector('.current-content').style.display = 'block';
                form.style.display = 'none';
            }
        });

        return false;
    }

    // Get csrf_token cookie. 
    // Reference: https://docs.djangoproject.com/en/3.1/ref/csrf/#ajax
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