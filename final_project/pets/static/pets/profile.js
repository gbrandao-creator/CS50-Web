document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = function() {handleScroll()};

    function handleScroll(){
        footer = document.querySelector('#footer');
        header = document.querySelector('#header');

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            if (! footer.className.includes('fade')) {
                footer.classList.add('fade');
                header.classList.add('fade');
            }
        } else {
            footer.classList.remove('fade');
            header.classList.remove('fade');
        }
    }
    
})
