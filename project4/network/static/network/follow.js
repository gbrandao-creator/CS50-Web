import {getCookie} from'./getCookie.js';

document.addEventListener('DOMContentLoaded', function() {
    // The follow button may not be available
    try{ 
        document.querySelector('#follow-button').addEventListener('click', follow);
    }
    catch (e) {
        console.log('No follow button available:' + e);
    }

    function follow(evt){
        const profileUsername = JSON.parse(document.getElementById('profile_username').textContent);
        const csrftoken = getCookie('csrftoken');
        
        fetch(`/follow/${profileUsername}`, {
            method: 'PUT',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        .then(res => res.json())
        .then(result => {
            if(! result['error']){
                if(evt.target.innerHTML == 'Follow'){
                    const followersCount = evt.target.parentElement.parentElement.querySelector('#followers-count');
                    followersCount.innerHTML = parseInt(followersCount.innerHTML) + 1;
                    evt.target.innerHTML = 'Unfollow';
                } else {
                    const followersCount = evt.target.parentElement.parentElement.querySelector('#followers-count');
                    followersCount.innerHTML = parseInt(followersCount.innerHTML) - 1;
                    evt.target.innerHTML = 'Follow';
                }
            }
        })
    }
})