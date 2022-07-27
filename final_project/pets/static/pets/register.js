document.addEventListener('DOMContentLoaded', function() {

        loadFirst();

    function loadFirst() {
        document.querySelector('#firstContainer').style.display = 'block';
        document.querySelector('#secondContainer').style.display = 'none';
        document.querySelector('#thirdContainer').style.display = 'none';
        document.querySelector('#fourthContainer').style.display = 'none';

        document.querySelector('#firstContainer').querySelector('#getStartedBtn').addEventListener('click', loadSecond);
    }

    function loadSecond() {
        const firstContainer = document.querySelector('#firstContainer');
        const secondContainer = document.querySelector('#secondContainer');
        const thirdContainer = document.querySelector('#thirdContainer');

        firstContainer.style.display = 'none';
        secondContainer.style.display = 'block';
        thirdContainer.style.display = 'none';

        secondContainer.querySelector('#loadPictureButton0').addEventListener('click', () => handleLoadPicture('0'));
        secondContainer.querySelector('#nextButton2').addEventListener('click', loadThird);
        secondContainer.querySelector('#skipButton2').addEventListener('click', loadThird);
        secondContainer.querySelector('#previousTwo').addEventListener('click', () => handlePrevious('2'));
    }

    function loadThird() {
        const secondContainer = document.querySelector('#secondContainer');
        const thirdContainer = document.querySelector('#thirdContainer');
        const fourthContainer = document.querySelector('#fourthContainer');

        secondContainer.style.display = 'none';
        thirdContainer.style.display = 'block';
        fourthContainer.style.display = 'none';

        thirdContainer.querySelector('#sitterShowCaseYes').style.display = 'none';

        // By default, next button is disabled
        thirdContainer.querySelector('#nextButton3').disabled = true;

        /* Enable next button if petSitterSelect select value is 'no' 
         or hourRate input value is not ''.*/
        thirdContainer.querySelector('#petSitterSelect').onchange = (evt) => {
            if (evt.target.value == 'no') {
                thirdContainer.querySelector('#nextButton3').disabled = false; 
                thirdContainer.querySelector('#sitterShowCaseYes').style.display = 'none'; 
            } else if (evt.target.value == 'yes') {
                thirdContainer.querySelector('#nextButton3').disabled = true; 
                thirdContainer.querySelector('#sitterShowCaseYes').style.display = 'block'; // Show some more info if user selects 'yes'
            } else {
                thirdContainer.querySelector('#nextButton3').disabled = true; 
                thirdContainer.querySelector('#sitterShowCaseYes').style.display = 'none';
            }
        }
        
        thirdContainer.querySelector('input#hourRate').onkeyup = (evt) => {
            if (evt.target.value !== '')
                thirdContainer.querySelector('#nextButton3').disabled = false;         
            else
                thirdContainer.querySelector('#nextButton3').disabled = true;
        }

        thirdContainer.querySelector('#nextButton3').addEventListener('click', loadFourth);
        thirdContainer.querySelector('#previousThree').addEventListener('click', () => handlePrevious('3'));
    }

    function loadFourth() {
        const thirdContainer = document.querySelector('#thirdContainer');
        const fourthContainer = document.querySelector('#fourthContainer');

        thirdContainer.style.display = 'none';
        fourthContainer.style.display = 'block';

        fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';
        fourthContainer.querySelector('#previousFour').addEventListener('click', () => handlePrevious('4'));
        reloadFourth();
    }
    
    function reloadFourth() {
        // By default, submit button is disabled
        //fourthContainer.querySelector('#submitButton').disabled = true;
        fourthContainer.querySelector('#addPetButton').addEventListener('click', handleAddPet);
        enableSubmit();
        
        if (Array.from(fourthContainer.querySelectorAll('.pet')).length > 1) {
            fourthContainer.querySelector('#removePetButton').disabled = false;
            fourthContainer.querySelector('#removePetButton').addEventListener('click', handleRemovePet);
        } else {
            fourthContainer.querySelector('#removePetButton').disabled = true;
        }
        

        fourthContainer.querySelectorAll('.pet').forEach( (div, index) => {
            div.querySelector(`#loadPictureButton${index + 1}`).addEventListener('click', () => handleLoadPicture(index + 1));
        })
    }

    // Enable submit button upon some conditions.
    function enableSubmit() {
        const fourthContainer = document.querySelector('#fourthContainer');

        fourthContainer.querySelector('#petOwnerSelect').addEventListener('change', (evt) => {
            if(evt.target.value == 'no'){
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';
                //fourthContainer.querySelector('#submitButton').disabled = false;
            } else if (evt.target.value == 'yes') {
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'block';
                //fourthContainer.querySelector('#submitButton').disabled = true;
            } else {
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';
                //fourthContainer.querySelector('#submitButton').disabled = true;
            }
        })


        /* this needs fix! */
        
        // Enable submit button if both PetName and petCategory have a value
        // for all .pet divs.
    }

    function handleAddPet() {
        const fourthContainer = document.querySelector('#fourthContainer');
        const petsNumber = parseInt(document.getElementById('petsNumber').value);

        const petEl = document.createElement('div');
        petEl.className = 'pet mt-4';
        petEl.id = `pet${petsNumber + 1}`;

        const previousPetEl = document.querySelector(`#pet${petsNumber}`);
        var petElHTML = previousPetEl.innerHTML;
        // Replace id's for new pet div
        petElHTML = petElHTML.replaceAll(`petLabel${petsNumber}`, `petLabel${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`Pet ${petsNumber}`, `Pet ${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`petName${petsNumber}`, `petName${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`petCategory${petsNumber}`, `petCategory${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`petPictureUrl${petsNumber}`, `petPictureUrl${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`loadPictureButton${petsNumber}`, `loadPictureButton${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`profilePicture${petsNumber}`, `profilePicture${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`petBio${petsNumber}`, `petBio${petsNumber + 1}`);
        // Replace names for new pet div
        petElHTML = petElHTML.replaceAll(`pet_name_${petsNumber}`, `pet_name_${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet_category_${petsNumber}`, `pet_category_${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet_picture_url_${petsNumber}`, `pet_picture_url_${petsNumber + 1}`);
        petElHTML = petElHTML.replaceAll(`pet_bio_${petsNumber}`, `pet_bio_${petsNumber + 1}`);

        petEl.innerHTML = petElHTML;

        fourthContainer.querySelector('#allPets').appendChild(petEl);
        document.getElementById('petsNumber').value = parseInt(document.getElementById('petsNumber').value) + 1;
        reloadFourth();
    }

    function handleRemovePet() {
        const fourthContainer = document.querySelector('#fourthContainer');
        const petsNumber = Array.from(fourthContainer.querySelectorAll('.pet')).length;

        lastPetDiv = fourthContainer.querySelector(`#pet${petsNumber}`);
        lastPetDiv.remove();
        document.getElementById('petsNumber').value = parseInt(document.getElementById('petsNumber').value) - 1;
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
        img = document.querySelector(`#profilePicture${pictureNumber}`);
        img.src = document.querySelector('#pictureInput').value;
    }

})