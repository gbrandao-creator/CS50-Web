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

        secondContainer.querySelector('#loadPhotoButton').addEventListener('click', () => handleLoadPicture('0'));
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
            if (evt.target.value == 'no')
                thirdContainer.querySelector('#nextButton3').disabled = false; 
            else
                thirdContainer.querySelector('#nextButton3').disabled = true; 
        }
        
        thirdContainer.querySelector('input#hourRate').onkeyup = (evt) => {
            if (evt.target.value !== '')
                thirdContainer.querySelector('#nextButton3').disabled = false;         
            else
                thirdContainer.querySelector('#nextButton3').disabled = true;
        }

        

        thirdContainer.querySelector('#petSitterSelect').addEventListener('change', (evt) => {
            if (evt.target.value == 'yes'){
                thirdContainer.querySelector('#sitterShowCaseYes').style.display = 'block';
            } else {
                thirdContainer.querySelector('#sitterShowCaseYes').style.display = 'none';
            }
        })

        thirdContainer.querySelector('#nextButton3').addEventListener('click', loadFourth);
    }

    function loadFourth() {
        const thirdContainer = document.querySelector('#thirdContainer');
        const fourthContainer = document.querySelector('#fourthContainer');

        thirdContainer.style.display = 'none';
        fourthContainer.style.display = 'block';

        fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';

        fourthContainer.querySelector('#petOwnerSelect').addEventListener('change', (evt) => {
            if(evt.target.value == 'yes'){
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'block';
            } else{
                fourthContainer.querySelector('#ownerShowCaseYes').style.display = 'none';
            }
        })
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
        img.src = document.querySelector('#photoInput').value;
    }

})