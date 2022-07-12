document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#first-container').style.display = 'block';
    document.querySelector('#second-container').style.display = 'none';
    document.querySelector('#third-container').style.display = 'none';
    
    document.querySelector('#first-container').querySelector('form').addEventListener('submit', handleFirstFormSubmit);
    
    function handleFirstFormSubmit(event) {
        const firstContainer = event.target.parentElement;
        const secondContainer = document.querySelector('#second-container');
        const thirdContainer = document.querySelector('#third-container');

        console.log('entrei aqui');

        firstContainer.style.display = 'none';
        secondContainer.style.display = 'block';
        thirdContainer.style.display = 'none';

        secondContainer.querySelector('#get-started-btn').addEventListener('click', handleGetStarted);
    }

    function handleGetStarted(event) {
        const secondContainer = document.querySelector('#second-container');
        const thirdContainer = document.querySelector('#third-container');

        secondContainer.style.display = 'none';
        thirdContainer.style.display = 'block';
    }

})