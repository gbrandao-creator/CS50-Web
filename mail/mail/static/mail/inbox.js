document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
  
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#single-email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // By default, submit button is disabled
  document.querySelector('#submit').disabled = true;

  const composeRecipients = document.querySelector('#compose-recipients')
  const composeSubject = document.querySelector('#compose-subject')
  const composeBody = document.querySelector('#compose-body')

  // Enable submit only if there's text in all required input fields
  document.querySelectorAll('.form-control').forEach(input => {
    input.onkeyup = () => { 
      if (composeRecipients.value.length > 0 & 
          composeSubject.value.length > 0 & 
          composeBody.value.length > 0)
        document.querySelector('#submit').disabled = false;
      else 
        document.querySelector('#submit').disabled = true;
      };
  });

  document.querySelector('#compose-form').onsubmit = () => {
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: composeRecipients.value,
        subject: composeSubject.value,
        body: composeBody.value
      })
    })
    .then(response => response.json())
    /*.then(result => {
      console.log(result);
    })*/
    .then(load_mailbox('sent'));
    return false;
  }
}

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  // Fetch twice to show recently sent emails; 
  fetch(`/emails/${mailbox}`);

  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    console.log(emails);

    emails.forEach(email => {
      
      const emailContainer = document.createElement('button');
      const emailContainerClass = 'btn d-flex justify-content-between border rounded w-100 p-2 mb-1 mt-1';
      if(email.read){
        emailContainer.className = emailContainerClass + ' bg-light';
      } else {
        emailContainer.className = emailContainerClass + ' unread';
      }

      emailContainer.innerHTML = `
      <div class="d-flex">
        <p class="font-weight-bold mr-5">${email.sender}</p>
        <p>${email.subject}</p>
      </div>
      <div class="d-flex">
        <button id="archive" class="btn btn-link btn-sm mr-3">${email.archived ? "Unarchive" : "Archive"}</button>
        <p class="text-secondary">${email.timestamp}</p>
      </div>`;


      // clicking on the email will load it
      emailContainer.addEventListener('click', () => load_email(email));

      // archive functionality
      const archiveElement = emailContainer.querySelector('#archive');
      if (mailbox === 'sent') {
        archiveElement.className = "btn btn-link btn-sm mr-3 disabled";
      } else{
        archiveElement.addEventListener('click', (e) => {
          e.stopPropagation();
          if (email.archived){
            fetch(`/emails/${email.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                archived: false
              })
            })
            load_mailbox('inbox');
          } else {
            fetch(`/emails/${email.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                archived: true
              })
            })
            archiveElement.innerHTML = "Unarchive";
            load_mailbox('inbox');
          }
        })
      }

      document.querySelector('#emails-view').append(emailContainer);  
    })
  })
}

function load_email(email) {
  // Show the email and hide other views
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'block';

  // mark email as 'read'
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  });

  // object with HTML ids and email content.
  const ids = {
    '#single-email-sender': email.sender,
    '#single-email-recipients': email.recipients, 
    '#single-email-subject': email.subject, 
    '#single-email-timestamp': email.timestamp, 
    '#single-email-body': email.body
  };

  // looping through object's keys
  // reference: https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members
  Object.keys(ids).forEach(key => {
    document.querySelector(key).innerHTML = ids[key];
  })

  document.querySelector('#reply').addEventListener('click', )
}