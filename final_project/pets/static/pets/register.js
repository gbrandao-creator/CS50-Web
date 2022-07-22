document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#firstContainer').style.display = 'block';
    document.querySelector('#secondContainer').style.display = 'none';
    document.querySelector('#thirdContainer').style.display = 'none';
    document.querySelector('#fourthContainer').style.display = 'none';

    document.querySelector('#firstContainer').querySelector('button').addEventListener('click', loadFirst);

    function loadFirst() {
        const firstContainer = document.querySelector('#firstContainer');
        const secondContainer = document.querySelector('#secondContainer');

        firstContainer.style.display = 'none';
        secondContainer.style.display = 'block';

        secondContainer.querySelector('#loadPictureButton0').addEventListener('click', () => handleLoadPicture('0'));
        secondContainer.querySelector('#nextButton2').addEventListener('click', loadThird);
        secondContainer.querySelector('#skipButton2').addEventListener('click', loadThird);
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
    }

    function loadFourth() {
        const thirdContainer = document.querySelector('#thirdContainer');
        const fourthContainer = document.querySelector('#fourthContainer');

        thirdContainer.style.display = 'none';
        fourthContainer.style.display = 'block';

        fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';
        reloadFourth();
    }
    
    function reloadFourth() {
        // By default, submit button is disabled
        fourthContainer.querySelector('#submitButton').disabled = true;
        enableSubmit();
        fourthContainer.querySelector('#addPetButton').addEventListener('click', handleAddPet)

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
                fourthContainer.querySelector('#submitButton').disabled = false;
            } else if (evt.target.value == 'yes') {
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'block';
                fourthContainer.querySelector('#submitButton').disabled = true;
            } else {
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';
                fourthContainer.querySelector('#submitButton').disabled = true;
            }
        })


        /* this needs fix! Actually need to check it for all inputs at the same time.
        Right now it checks for each div, and if one div satisfies the condition, the
        submit button is enabled */
        
        // Enable submit button if both PetName and petCategory have a value
        // for all .pet divs.
        fourthContainer.querySelectorAll('.pet').forEach((div, index) => {
            console.log(index);
            div.querySelector(`#petCategory${index + 1}`).onchange = (evt) => {
                if (evt.target.value !== '' & div.querySelector(`#petName${index+1}`).value !== '')
                    fourthContainer.querySelector('#submitButton').disabled = false;         
                else
                    fourthContainer.querySelector('#submitButton').disabled = true;
            }

            div.querySelector(`#petName${index + 1}`).onkeyup = (evt) => {
                if (evt.target.value !== '' & div.querySelector(`#petCategory${index + 1}`).value !== '')
                    fourthContainer.querySelector('#submitButton').disabled = false;         
                else
                    fourthContainer.querySelector('#submitButton').disabled = true;
            }
        })
    }

    function handleAddPet() {
        const fourthContainer = document.querySelector('#fourthContainer');
        const petsNumber = Array.from(fourthContainer.querySelectorAll('.pet')).length + 1;

        const petEl = document.createElement('div');
        petEl.className = 'pet mt-4';
        petEl.id = `pet${petsNumber}`;
        petEl.innerHTML = `
        <label class="form-check-label mt-2" for="petName${petsNumber}">
            <p class="fw-semibold">Pet ${petsNumber}</p>
        </label>
        <div class="input-group">
            <span class="input-group-text">Pet's name</span>
            <input id="petName${petsNumber}" type="text" class="form-control" placeholder="Insert your pet's name" aria-label="Pet name" aria-describedby="basic-addon1">
        </div>
        <select id="petCategory${petsNumber}" class="form-select my-3" aria-label="pet category">
            <option value="" selected>Select your pet's category</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="fish">Fish</option>
        </select>
        <div class="input-group">
            <input type="text" autofocus class="form-control" id="petPictureUrl${petsNumber}" name="pet_picture_url_1" placeholder="Insert profile picture URL" aria-describedby="button-load">
            <button class="btn btn-outline-secondary" type="button" id="loadPictureButton${petsNumber}">Load Picture</button>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <img class="profile-picture-mini"
            id="petProfilePicture${petsNumber}" src="{% static 'pets/img/default_profile.png' %}" alt="default profile picture">
        </div>
        <div class="form-floating my-3">
            <textarea class="form-control" placeholder="Write a bio" id="petBio" style="height: 8rem" name="pet_bio"></textarea>
            <label for="bio">Write a bio!</label>
        </div>`

        fourthContainer.querySelector('#allPets').appendChild(petEl);
        reloadFourth();
    }

    function handlePrevious(containerNumber) {
        let numberObj = {
            'first': '1',
            'second': '2',
            'third': '3',
            'fourth': '4'
        };
    }

    function handleLoadPicture(pictureNumber) {
        img = document.querySelector(`#profilePicture${pictureNumber}`);
        img.src = document.querySelector('#pictureInput').value;
    }

})