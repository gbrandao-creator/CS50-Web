document.addEventListener('DOMContentLoaded', function() {

        loadFirst();

    function loadFirst() {
        const firstContainer = document.querySelector('#first-container');
        const secondContainer = document.querySelector('#second-container');
        const thirdContainer = document.querySelector('#third-container');
        const fourthContainer = document.querySelector('#fourth-container');

        firstContainer.style.display = 'block';
        secondContainer.style.display = 'none';
        thirdContainer.style.display = 'none';
        fourthContainer.style.display = 'none';

        document.querySelector('#get-started-btn').addEventListener('click', loadSecond);
    }

    function loadSecond() {
        const firstContainer = document.querySelector('#first-container');
        const secondContainer = document.querySelector('#second-container');
        const thirdContainer = document.querySelector('#third-container');



        firstContainer.style.display = 'none';
        secondContainer.style.display = 'block';
        thirdContainer.style.display = 'none';

        secondContainer.querySelector('#load-picture-btn-0').addEventListener('click', () => handleLoadPicture('0'));
        secondContainer.querySelector('#next-btn-2').addEventListener('click', loadThird);
        secondContainer.querySelector('#skip-btn-2').addEventListener('click', loadThird);
        secondContainer.querySelector('#previous-two').addEventListener('click', () => handlePrevious('2'));
    }

    function loadThird() {
        const secondContainer = document.querySelector('#second-container');
        const thirdContainer = document.querySelector('#third-container');
        const fourthContainer = document.querySelector('#fourth-container');

        secondContainer.style.display = 'none';
        thirdContainer.style.display = 'block';
        fourthContainer.style.display = 'none';

        thirdContainer.querySelector('#sitter-show-yes').style.display = 'none';

        // By default, next button is disabled
        thirdContainer.querySelector('#next-btn-3').disabled = true;

        /* Enable next button if petSitterSelect select value is 'no' 
         or hourRate input value is not ''.*/
        thirdContainer.querySelector('#pet-sitter-select').onchange = (evt) => {
            if (evt.target.value == 'no') {
                thirdContainer.querySelector('#next-btn-3').disabled = false; 
                thirdContainer.querySelector('#sitter-show-yes').style.display = 'none'; 
            } else if (evt.target.value == 'yes') {
                thirdContainer.querySelector('#next-btn-3').disabled = true; 
                thirdContainer.querySelector('#sitter-show-yes').style.display = 'block'; // Show some more info if user selects 'yes'
            } else {
                thirdContainer.querySelector('#next-btn-3').disabled = true; 
                thirdContainer.querySelector('#sitter-show-yes').style.display = 'none';
            }
        }
        
        thirdContainer.querySelector('input#hour-rate').onkeyup = (evt) => {
            if (evt.target.value !== '')
                thirdContainer.querySelector('#next-btn-3').disabled = false;         
            else
                thirdContainer.querySelector('#next-btn-3').disabled = true;
        }

        thirdContainer.querySelector('#next-btn-3').addEventListener('click', loadFourth);
        thirdContainer.querySelector('#previous-three').addEventListener('click', () => handlePrevious('3'));
    }

    function loadFourth() {
        const thirdContainer = document.querySelector('#third-container');
        const fourthContainer = document.querySelector('#fourth-container');

        thirdContainer.style.display = 'none';
        fourthContainer.style.display = 'block';

        fourthContainer.querySelector('#owner-show-yes').style.display = 'none';
        fourthContainer.querySelector('#previous-four').addEventListener('click', () => handlePrevious('4'));
        fourthContainer.querySelector('#pet-owner-select').addEventListener('change', selectShow);
        reloadFourth();
    }
    
    /*
    * Reloads fourth container when a new pet is added or removed:
    * Enable and disable '#remove-pet-btn' and submit buttons.
    * It also adds an event listener for new '#load-picture-btn-' buttons.
    */
    function reloadFourth() {
        const fourthContainer = document.querySelector('#fourth-container');
        fourthContainer.querySelector('#add-pet-btn').addEventListener('click', handleAddPet);

        // By default, submit button is disabled
        fourthContainer.querySelector('#submit-btn').disabled = true;
        enableSubmit();
        
        if (Array.from(fourthContainer.querySelectorAll('.pet')).length > 1) {
            fourthContainer.querySelector('#remove-pet-btn').disabled = false;
            fourthContainer.querySelector('#remove-pet-btn').addEventListener('click', handleRemovePet);
        } else {
            fourthContainer.querySelector('#remove-pet-btn').disabled = true;
        }
        
        fourthContainer.querySelectorAll('.pet').forEach( (div, index) => {
            div.querySelector(`#load-picture-btn-${index + 1}`).addEventListener('click', () => handleLoadPicture(index + 1));
        })
    }

    /*
    * Show container based on select 
    */
    function selectShow(evt) {
        const fourthContainer = document.querySelector('#fourth-container');
        if(evt.target.value == 'no'){
            fourthContainer.querySelector('#owner-show-yes').style.display = 'none';
        } else if (evt.target.value == 'yes') {
            fourthContainer.querySelector('#owner-show-yes').style.display = 'block';
        } else {
            fourthContainer.querySelector('#owner-show-yes').style.display = 'none';
        }
    }

    /*
    * Enable submit button if some fields are not empty.
    */
    function enableSubmit() {
        const fourthContainer = document.querySelector('#fourth-container');
        const petsNumber = parseInt(document.getElementById('pets-number').value);

        fourthContainer.querySelectorAll('.pet').forEach((petDiv, index) => {
            petDiv.querySelector(`#pet-name-${index}`).onkeyup = (evt) => {} // Incomplete
        })
    }

    function handleAddPet() {
        const fourthContainer = document.querySelector('#fourth-container');
        const petsNumber = parseInt(document.getElementById('pets-number').value);

        const petEl = document.createElement('div');
        petEl.className = 'pet mt-4';
        petEl.id = `pet-${petsNumber + 1}`;

        const previousPetEl = document.querySelector(`#pet-${petsNumber}`);
        var petElHTML = previousPetEl.innerHTML;
        // Replace id's for new pet div
        petElHTML = petElHTML.replaceAll(`pet-label-${petsNumber}`, `pet-label-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`Pet ${petsNumber}`, `Pet ${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet-name-${petsNumber}`, `pet-name-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet-category-${petsNumber}`, `pet-category-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet-picture-url-${petsNumber}`, `pet-picture-url-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`load-picture-btn-${petsNumber}`, `load-picture-btn-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`profile-picture-${petsNumber}`, `profile-picture-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`picture-input-${petsNumber}`, `picture-input-${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet-bio-${petsNumber}`, `pet-bio-${petsNumber + 1}`);
        
        // Replace names for new pet div
        petElHTML = petElHTML.replaceAll(`pet_name_${petsNumber}`, `pet_name_${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet_category_${petsNumber}`, `pet_category_${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet_picture_url_${petsNumber}`, `pet_picture_url_${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet_bio_${petsNumber}`, `pet_bio_${petsNumber + 1}`);

        petEl.innerHTML = petElHTML;
        petEl.querySelector(`#profile-picture-${petsNumber + 1}`).src = 'https://i.imgur.com/goo3sbF.png' // Replace img src to default

        fourthContainer.querySelector('#all-pets').appendChild(petEl);
        document.getElementById('pets-number').value = parseInt(document.getElementById('pets-number').value) + 1;
        reloadFourth();
    }

    function handleRemovePet() {
        const fourthContainer = document.querySelector('#fourth-container');
        const petsNumber = Array.from(fourthContainer.querySelectorAll('.pet')).length;

        lastPetDiv = fourthContainer.querySelector(`#pet-${petsNumber}`);
        lastPetDiv.remove();
        document.getElementById('pets-number').value = parseInt(document.getElementById('pets-number').value) - 1;
        reloadFourth();
    }

    function handlePrevious(currentContainerNumber) {

        switch (currentContainerNumber) {
            case '2': 
                loadFirst();
                break;
            case '3':
                loadSecond();
                break;
            case '4':
                loadThird();
                break;
            default:
                console.log(`Sorry, I couldn't find container number ${currentContainerNumber}`);
        }
    }

    function handleLoadPicture(pictureNumber) {
        img = document.querySelector(`#profile-picture-${pictureNumber}`);
        img.src = document.querySelector(`#picture-input-${pictureNumber}`).value;
    }

})