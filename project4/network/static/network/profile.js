document.addEventListener('DOMContentLoaded', function() {
    // get profile page user's username
    const username = JSON.parse(document.getElementById('profile_username').textContent);
    document.querySelector('#follow-button').addEventListener('click', () => follow(username));

    
    
    function follow(username) {
        fetch(`/follow/${username}`, {
            method: 'POST',
            body: JSON.stringify({
                usernamee: username
            }) 
        });
        //.then(response => console.log(response));
    }
})