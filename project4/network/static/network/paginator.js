document.addEventListener('DOMContentLoaded', function() {
    loadPage();

    document.querySelector('#previous-page').addEventListener('click', () => loadPage());
    document.querySelector('#page-button-1').addEventListener('click', () => loadPage());
    document.querySelector('#page-button-2').addEventListener('click', () => loadPage());
    document.querySelector('#page-button-3').addEventListener('click', () => loadPage());
    document.querySelector('#next-page').addEventListener('click', () => loadPage());
    
    function loadPage() {
        const currentPageNumber = JSON.parse(document.getElementById('page_number').textContent);
        const numPages = JSON.parse(document.getElementById('num_pages').textContent);

        previousPage = document.querySelector('#previous-page');
        pageButton1 = document.querySelector('#page-button-1');
        pageButton2 = document.querySelector('#page-button-2');
        pageButton3 = document.querySelector('#page-button-3');
        nextPage = document.querySelector('#next-page');

        /* If the third button label reached the total number of pages
        we want to set the inner HTML based on this total.*/
        if (currentPageNumber + 2 > numPages){
            pageButton1.innerHTML = numPages - 2;
            pageButton2.innerHTML = numPages - 1;
            pageButton3.innerHTML = numPages;

            pageButton1.href = `?page=${numPages - 2}`;
            pageButton2.href = `?page=${numPages - 1}`;
            pageButton3.href = `?page=${numPages}`;

            if (numPages == 1) {
                pageButton1.style.display = 'none';
                pageButton2.style.display = 'none';
            } else if (numPages == 2) {
                pageButton1.style.display = 'none';
            } else {
                pageButton1.style.display = 'block';
                pageButton2.style.display = 'block';
                pageButton3.style.display = 'block';
            }
        } /* Else, we want to set the inner HTMLs based on 
        currentPageNumber.*/
        /* If the current page is not the first, the 
        second button is the active one.*/
        else if (currentPageNumber != 1) {
            pageButton1.innerHTML = currentPageNumber - 1;
            pageButton2.innerHTML = currentPageNumber;
            pageButton3.innerHTML = currentPageNumber + 1;

            pageButton1.href = `?page=${currentPageNumber - 1}`;
            pageButton2.href = `?page=${currentPageNumber}`;
            pageButton3.href = `?page=${currentPageNumber + 1}`;
        } // The first button is the active one otherwise. 
        else {
            pageButton1.innerHTML = currentPageNumber;
            pageButton2.innerHTML = currentPageNumber + 1;
            pageButton3.innerHTML = currentPageNumber + 2;

            pageButton1.href = `?page=${currentPageNumber}`;
            pageButton2.href = `?page=${currentPageNumber + 1}`;
            pageButton3.href = `?page=${currentPageNumber + 2}`;
        }

        previousPage.href = `?page=${currentPageNumber - 1}`;
        nextPage.href = `?page=${currentPageNumber + 1}`;

        // Styling the active button 
        styleActive();
        return false;
    }

    function styleActive(){
        const currentPageNumber = JSON.parse(document.getElementById('page_number').textContent);

        pageButton1 = document.querySelector('#page-button-1');
        pageButton2 = document.querySelector('#page-button-2');
        pageButton3 = document.querySelector('#page-button-3');
        
        pageButton1.parentElement.className = 'page-item';
        pageButton2.parentElement.className = 'page-item';
        pageButton3.parentElement.className = 'page-item';
        pageButtons = [pageButton1, pageButton2, pageButton3];
        for (index in pageButtons){
            if (pageButtons[index].innerHTML == currentPageNumber){
                pageButtons[index].parentElement.className = 'page-item active';
            }
        }
        return false;
    }
})