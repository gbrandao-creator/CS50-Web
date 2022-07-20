document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#firstContainer').style.display = 'block';
    document.querySelector('#secondContainer').style.display = 'none';
    document.querySelector('#thirdContainer').style.display = 'none';
    
    document.querySelector('#firstContainer').querySelector('button').addEventListener('click', handleGetStarted);
    //document.querySelector('#loadPhotoButton').addEventListener('click', handleLoadPhoto);

    function handleGetStarted() {
        const firstContainer = document.querySelector('#firstContainer');
        const secondContainer = document.querySelector('#secondContainer');
        const thirdContainer = document.querySelector('#thirdContainer');

        firstContainer.style.display = 'none';
        secondContainer.style.display = 'block';
        thirdContainer.style.display = 'none';

        secondContainer.querySelector('#loadPhotoButton').addEventListener('click', handleLoadPhoto);
        secondContainer.querySelector('#nextButton').addEventListener('click', loadThird);
        secondContainer.querySelector('#skipButton').addEventListener('click', loadThird);
        //secondContainer.querySelector('.previousButton').addEventListener('click', handlePrevious);
    }

    function loadThird() {
        /* Every container has an immediate form child */
        //const container = evt.target.closest('form').parentElement;

        const firstContainer = document.querySelector('#firstContainer');
        const secondContainer = document.querySelector('#secondContainer');
        const thirdContainer = document.querySelector('#thirdContainer');

        firstContainer.style.display = 'none';
        secondContainer.style.display = 'none';
        thirdContainer.style.display = 'block';

        thirdContainer.querySelector('#showCaseYes').style.display = 'none';

        thirdContainer.querySelector('#petSitterSelect').addEventListener('change', (evt) => {
            if(evt.target.value == 'yes'){
                thirdContainer.querySelector('#showCaseYes').style.display = 'block';

            } else{
                thirdContainer.querySelector('#showCaseYes').style.display = 'none';
            }
        })

        /*if(thirdContainer.querySelector('#petSitterSelect').value == 'yes'){
            thirdContainer.querySelector('#bio').style.display = 'block';
            thirdContainer.querySelector('#bioLabel').style.display = 'block';
        } else{
            thirdContainer.querySelector('#bio').style.display = 'none';
            thirdContainer.querySelector('#bioLabel').style.display = 'none';
        }*/

    }

    function handleLoadPhoto() {
        img = document.querySelector('#profilePicture');
        img.src = document.querySelector('#photoInput').value;
    }

})