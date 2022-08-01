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

        thirdContainer.querySelector('#owner-show-yes').style.display = 'none';
        thirdContainer.querySelector('#previous-three').addEventListener('click', () => handlePrevious('3'));
        thirdContainer.querySelector('#pet-owner-select').addEventListener('change', selectShow);
        thirdContainer.querySelector('#next-btn-3').addEventListener('click', loadFourth);
        reloadThird();
    }

    function loadFourth() {
        const secondContainer = document.querySelector('#second-container');
        const thirdContainer = document.querySelector('#third-container');
        const fourthContainer = document.querySelector('#fourth-container');

        secondContainer.style.display = 'none';
        thirdContainer.style.display = 'none';
        fourthContainer.style.display = 'block';

        fourthContainer.querySelector('#sitter-show-yes').style.display = 'none';

        // By default, next button is disabled
        fourthContainer.querySelector('#submit-btn').disabled = true;

        /* Enable next button if petSitterSelect select value is 'no' 
         or hourRate input value is not ''.*/
         fourthContainer.querySelector('#pet-sitter-select').onchange = (evt) => {
            if (evt.target.value == 'no') {
                if (document.querySelector('#pet-owner-select').value == 'no') {
                    alert('You must be at least a Pet Owner or a Pet Sitter, in order to confirm your registration.')
                    fourthContainer.querySelector('#submit-btn').disabled = true;
                }
                fourthContainer.querySelector('#submit-btn').disabled = false; 
                fourthContainer.querySelector('#sitter-show-yes').style.display = 'none'; 
            } else if (evt.target.value == 'yes') {
                fourthContainer.querySelector('#submit-btn').disabled = true; 
                fourthContainer.querySelector('#sitter-show-yes').style.display = 'block'; // Show some more info if user selects 'yes'
            } else {
                fourthContainer.querySelector('#submit-btn').disabled = true; 
                fourthContainer.querySelector('#sitter-show-yes').style.display = 'none';
            }
        }
        
        fourthContainer.querySelector('input#hour-rate').onkeyup = (evt) => {
            if (evt.target.value !== '')
            fourthContainer.querySelector('#submit-btn').disabled = false;         
            else
            fourthContainer.querySelector('#submit-btn').disabled = true;
        }

        fourthContainer.querySelector('#previous-four').addEventListener('click', () => handlePrevious('4'));
    }
    
    /*
    * Reloads third container when a new pet is added or removed:
    * Enable and disable '#remove-pet-btn' and submit buttons.
    * It also adds an event listener for new '#load-picture-btn-' buttons.
    */
    function reloadThird() {
        const thirdContainer = document.querySelector('#third-container');
        thirdContainer.querySelector('#add-pet-btn').addEventListener('click', handleAddPet);

        // By default, submit button is disabled
        thirdContainer.querySelector('#next-btn-3').disabled = true;
        enableNext();
        
        if (Array.from(thirdContainer.querySelectorAll('.pet')).length > 1) {
            thirdContainer.querySelector('#remove-pet-btn').disabled = false;
            thirdContainer.querySelector('#remove-pet-btn').addEventListener('click', handleRemovePet);
        } else {
            thirdContainer.querySelector('#remove-pet-btn').disabled = true;
        }
        
        thirdContainer.querySelectorAll('.pet').forEach( (div, index) => {
            div.querySelector(`#load-picture-btn-${index + 1}`).addEventListener('click', () => handleLoadPicture(index + 1));
        })
    }

    /*
    * Show container based on select 
    */
    function selectShow(evt) {
        const thirdContainer = document.querySelector('#third-container');
        if (evt.target.value == 'no'){
            thirdContainer.querySelector('#next-btn-3').disabled = false;
            thirdContainer.querySelector('#owner-show-yes').style.display = 'none';
        } else if (evt.target.value == 'yes') {
            thirdContainer.querySelector('#owner-show-yes').style.display = 'block';
        } else {
            thirdContainer.querySelector('#owner-show-yes').style.display = 'none';
        }
    }

    /*
    * Enable next button if some fields are not empty.
    */
    function enableNext() {
        const thirdContainer = document.querySelector('#third-container');
        const allPets = thirdContainer.querySelectorAll('.pet');

        allPets.forEach((petDiv, index) => {
            petDiv.querySelector(`#pet-name-${index + 1}`).onkeyup = () => {
                if (Array.from(allPets).every((petDiv,index) => {
                    return petDiv.querySelector(`#pet-name-${index + 1}`).value !== ''
                    & petDiv.querySelector(`#pet-category-${index + 1}`).value !== '';
                })) {
                    thirdContainer.querySelector('#next-btn-3').disabled = false;
                } else { 
                    thirdContainer.querySelector('#next-btn-3').disabled = true;
                 }
            }

            petDiv.querySelector(`#pet-category-${index + 1}`).onchange = () => {
                if (Array.from(allPets).every((petDiv,index) => {
                    return petDiv.querySelector(`#pet-name-${index + 1}`).value !== ''
                    & petDiv.querySelector(`#pet-category-${index + 1}`).value !== '';
                })) {
                    thirdContainer.querySelector('#next-btn-3').disabled = false;
                } else {
                    thirdContainer.querySelector('#next-btn-3').disabled = true;
                }
            }
        })
    }

    function handleAddPet() {
        const thirdContainer = document.querySelector('#third-container');
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

        thirdContainer.querySelector('#all-pets').appendChild(petEl);
        document.getElementById('pets-number').value = parseInt(document.getElementById('pets-number').value) + 1;
        reloadThird();
    }

    function handleRemovePet() {
        const thirdContainer = document.querySelector('#third-container');
        const petsNumber = Array.from(thirdContainer.querySelectorAll('.pet')).length;

        lastPetDiv = thirdContainer.querySelector(`#pet-${petsNumber}`);
        lastPetDiv.remove();
        document.getElementById('pets-number').value = parseInt(document.getElementById('pets-number').value) - 1;
        reloadThird();
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