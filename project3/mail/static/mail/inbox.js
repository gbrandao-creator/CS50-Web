document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => loadMailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => loadMailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => loadMailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => composeEmail());

  // By default, load the inbox
  loadMailbox('inbox');

});

function composeEmail(reply=false, originalEmail=undefined) {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email-view').style.display = 'none';
  document.querySelector('#error').style.visibility = 'hidden';
  document.querySelector('#error').style.animationPlayState = 'paused';

  // Composition fields initial values 
  // If replying an email, pre-fill with original email content
  if (reply) {
    document.querySelector('#compose-recipients').value = originalEmail.sender;
    document.querySelector('#compose-recipients').disabled = true;

    if (originalEmail.subject.includes('Re:')) {
      document.querySelector('#compose-subject').value = originalEmail.subject;
    } else {
      document.querySelector('#compose-subject').value = 'Re: ' + originalEmail.subject;
    }
      document.querySelector('#compose-body').value = `On ${originalEmail.timestamp}  ${originalEmail.sender}  wrote:\n${originalEmail.body}`;
    
  } else {
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-recipients').disabled = false;
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }

  enableSubmitButton();
  document.querySelector('#compose-form').onsubmit = () => handleComposeSubmit();
}

function loadMailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'none';

  
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  // Fetch API twice to show recently sent emails; 
  fetch(`/emails/${mailbox}`);

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    if (emails.length > 0) {
      emails.forEach(email => {
        const emailContainer = document.createElement('button');
        const emailContainerClass = 'btn d-flex justify-content-between border rounded w-100 p-2 mb-1 mt-1';
        if(email.read){
          emailContainer.className = emailContainerClass + ' bg-light';
        } else {
          emailContainer.className = emailContainerClass + ' unread';
        }
  
        emailContainer.innerHTML = `
        <div style="line-height: 2.5em" class="d-flex">
          <span class="font-weight-bold mr-5">${email.sender}</span>
          <span>${email.subject}</span>
        </div>
        <div style="line-height: 2.5em" class="d-flex">
          <button id="archive" class="btn btn-link btn-sm mr-3">${email.archived ? "Unarchive" : "Archive"}</button>
          <span class="text-secondary">${email.timestamp}</span>
        </div>`;
  
        emailContainer.addEventListener('click', () => loadEmail(email));
  
        // Archive functionality
        archiveEmail(email, mailbox, emailContainer);
  
        document.querySelector('#emails-view').append(emailContainer);  
      })
    } else {
      const text = document.createElement('h4');
      text.className = 'mt-5 text-center'
      text.innerHTML = 'No emails in this mailbox.'
      document.querySelector('#emails-view').appendChild(text);

    }
    
  });
}

function loadEmail(email) {
  // Show the email and hide other views
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'block';

  // Mark email as 'read'
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  });

  // Object with HTML ids and email content.
  const ids = {
    '#single-email-sender': email.sender,
    '#single-email-recipients': email.recipients, 
    '#single-email-subject': email.subject, 
    '#single-email-timestamp': email.timestamp, 
    '#single-email-body': email.body
  };

  // Looping through object's keys
  // Reference: https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members
  Object.keys(ids).forEach(key => {
    document.querySelector(key).innerHTML = "<pre>" + ids[key] + "</pre>";
  });

  document.querySelector('#reply').addEventListener('click', () => composeEmail(reply=true, originalEmail=email));
}


/**
 * Enables and disables 'Compose' form submit button.
 * 
 * It enables and disables depending on whether 
 * all the form inputs' value not empty.
 */
function enableSubmitButton() {
    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable submit only if there's text in all required input fields
    document.querySelectorAll('.form-control').forEach(input => {
      input.onkeyup = () => { 
        if (Array.from(document.querySelectorAll('.form-control')).every((input, index) => {
          return input.value.length > 0;
        })){
          document.querySelector('#submit').disabled = false;
        } else {
          document.querySelector('#submit').disabled = true;
        }
      }
    });
}

/**
 * Handles 'Compose' form submit.
 * 
 * Makes an API POST call to submit the form and 
 * update the database. Shows an error message in case 
 * an error occured. 
 */
function handleComposeSubmit() {
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
  .then(res => {
    console.log(res);
    if(res['error']){
      document.querySelector('#error').innerHTML = res['error'];
      document.querySelector('#error').style.visibility = 'visible';
      document.querySelector('#error').style.animationPlayState = 'running';
    } else {
      loadMailbox('sent');
    }
  });
  return false;
}

/**
 * Archives and unarchives an email.
 * 
 * Makes an API PUT call to update the database. 
 * Updates inner HTML of the email element.
 * 
 * @param {*} email                              JSON email element.
 * @param {string} mailbox                       Mailbox the user's in.
 * @param {HTMLButtonElement} emailContainer     Button holding the email on the DOM.
 */
function archiveEmail(email, mailbox, emailContainer) {

  const archiveElement = emailContainer.querySelector('#archive');
  if (mailbox === 'sent') {
    archiveElement.className = "btn btn-link btn-sm mr-3 disabled";
  } else{
    archiveElement.addEventListener('click', (e) => {
      e.stopPropagation(); // We wish to click only the archive button.
      if (email.archived){
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: false
          })
        })
        loadMailbox('inbox');
      } else {
        fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            archived: true
          })
        })
        archiveElement.innerHTML = "Unarchive";
        loadMailbox('inbox');
      }
    });
  }
}