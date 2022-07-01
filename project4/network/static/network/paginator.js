document.addEventListener('DOMContentLoaded', function() {
    load_page();

    document.querySelector('#previous_page').addEventListener('click', () => load_page());
    document.querySelector('#page_button_1').addEventListener('click', () => load_page());
    document.querySelector('#page_button_2').addEventListener('click', () => load_page());
    document.querySelector('#page_button_3').addEventListener('click', () => load_page());
    document.querySelector('#next_page').addEventListener('click', () => load_page());
    
    function load_page() {
        const current_page_number = JSON.parse(document.getElementById('page_number').textContent);
        const num_pages = JSON.parse(document.getElementById('num_pages').textContent);

        previous_page = document.querySelector('#previous_page');
        page_button_1 = document.querySelector('#page_button_1');
        page_button_2 = document.querySelector('#page_button_2');
        page_button_3 = document.querySelector('#page_button_3');
        next_page = document.querySelector('#next_page')

        // If the third button label reached the total number of pages
        // we want to set the inner HTML based on this total.
        if (current_page_number + 2 > num_pages){
            page_button_1.innerHTML = num_pages - 2;
            page_button_2.innerHTML = num_pages - 1;
            page_button_3.innerHTML = num_pages;

            page_button_1.href = `?page=${num_pages - 2}`;
            page_button_2.href = `?page=${num_pages - 1}`;
            page_button_3.href = `?page=${num_pages}`;
        } // Else, we want to set the inner HTMLs based on 
        // current_page_number.  
        else {
            page_button_1.innerHTML = current_page_number;
            page_button_2.innerHTML = current_page_number + 1;
            page_button_3.innerHTML = current_page_number + 2;

            page_button_1.href = `?page=${current_page_number}`;
            page_button_2.href = `?page=${current_page_number + 1}`;
            page_button_3.href = `?page=${current_page_number + 2}`;
        }

        previous_page.href = `?page=${current_page_number - 1}`;
        next_page.href = `?page=${current_page_number + 1}`;

        // styling the active button 
        page_button_1.parentElement.className = 'page-item';
        page_button_2.parentElement.className = 'page-item';
        page_button_3.parentElement.className = 'page-item';
        page_buttons = [page_button_1, page_button_2, page_button_3];
        for (index in page_buttons){
            if (page_buttons[index].innerHTML == current_page_number){
                page_buttons[index].parentElement.className = 'page-item active';
            }
        }
    }
})