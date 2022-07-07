import {getCookie} from'./getCookie.js';

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-post').forEach(button => {
        button.addEventListener('click', editPost)
    })

    function editPost(evt){
        const postContent = evt.currentTarget.closest('.post').querySelector('.post-content');
        // Show form
        postContent.querySelector('.current-content').style.display = 'none';
        var form = postContent.querySelector('form');
        form.style.display = 'block';
        // Prepopulate form
        form.elements['content'].innerHTML = `${postContent.querySelector('.current-content').innerHTML}`;

        // By default, submit button is disabled
        const saveButton = form.elements['save'];
        saveButton.disabled = true;

        // Enable submit only if there's text in content field, and the content is not the same as before
        const formContent = form.elements['content'];
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

    function handleCancel(evt){
        const form = evt.currentTarget.parentElement.parentElement;
        const postContent = form.parentElement;
        
        postContent.querySelector('.current-content').style.display = 'block';
        form.style.display = 'none';
    }

    function handleSubmit(evt){
        var form = evt.currentTarget.parentElement.parentElement;
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
        .then(response => response.json())
        .then(res => {
            console.log(res);
            if(! res['error']){
                form.parentElement.querySelector('.current-content').innerHTML = formContent;
                form.parentElement.querySelector('.current-content').style.display = 'block';
                form.style.display = 'none';
            }
        });

        return false;
    }
})