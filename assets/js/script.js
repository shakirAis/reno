window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let name = document.getElementsByClassName("name_input")[0];
        let name_value = name.value;
        let phone = document.getElementsByClassName("phone_input")[0];
        let phone_value = phone.value;
        let choosenDate = document.getElementsByClassName("date_input")[0];
        let choosenDate_value = choosenDate.value;
        let choosenObject = document.getElementsByClassName("choosen_object")[0];
        let choosenObject_value = choosenObject.value;
        let contact_form = document.getElementById('contact-form');
        let success_sent_message = document.getElementById('success_sent_message');
        let fix_mistakes = document.getElementById('fix_mistakes');
        let error = 0;
        if (name_value === '' || name_value === undefined) {
            error = 1;
            name.classList.add('error');
        } 
        if (name_value.length < 2 || name_value.length > 15) {
            error = 1;
            name.classList.add('error');
        } 
        if (phone_value === '' || phone_value === undefined) {
            error = 1;
            phone.classList.add('error');
        }
        this.contact_number.value = Math.random() * 100000 | 0;
        if (error === 0) {
            emailjs.sendForm('gmail', 'hausmaster_callback', this);
            contact_form.style.display = 'none';
            success_sent_message.style.display = 'table';
            fix_mistakes.style.visibility = 'hidden';                   
        } else {
            fix_mistakes.textContent = 'Длина имени должна быть не меньше 2 и не больше 12 символов!'
            fix_mistakes.style.visibility = 'visible';
        }
    });
}

function showMoreBlock(blocks_nummer) {
    let current_btn = document.getElementsByClassName('active_btn');
    let pressed_btn = document.getElementsByClassName(blocks_nummer);
    let current_block = document.getElementsByClassName('active');
    let new_block = document.getElementById(blocks_nummer);
    let object_title = document.getElementsByClassName('object_title');
    let next_title_block = object_title[blocks_nummer-1].parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    
    
    if (next_title_block) {
        let next_title = next_title_block.getElementsByTagName('h3');
        let next_title_txt = next_title[0].textContent;
        document.getElementsByClassName('object_title')[blocks_nummer-1].nextElementSibling.textContent = next_title_txt;
    } else {
        document.getElementsByClassName('object_title')[blocks_nummer-1].nextElementSibling.textContent = object_title[0].textContent;
    }
    
    if (current_btn[0].classList.contains('active_btn')) {
        current_btn[0].classList.remove('active_btn');
    }
    
    pressed_btn[0].classList.add('active_btn');
    
    if (current_block[0].classList.contains('active')) {
        current_block[0].classList.remove('active');
    }
    
    new_block.classList.add('active');
}
function explain(x) {
    let shirt_txt = x.getElementsByClassName("shirt_txt")[0];
    let long_txt = x.getElementsByClassName("long_txt")[0];
    shirt_txt.style.display = "none";
    long_txt.style.display = "block";
    x.classList.add("fade-in");
    x.classList.remove("fade-out");
}
function normal(x) {
    let shirt_txt = x.getElementsByClassName("shirt_txt")[0];
    let long_txt = x.getElementsByClassName("long_txt")[0];
    shirt_txt.style.display = "block";
    long_txt.style.display = "none";
    x.classList.remove("fade-in");
    x.classList.add("fade-out");
}
function open_date() {
    let current_date = new Date().toISOString().slice(0,10);
    document.getElementById("actualDate").value = current_date;
}
function openMenu() {
    let header = document.getElementById('header');
    let menu = header.getElementsByTagName('ul')[0];
    menu.classList.add('active');
    let my_body = document.getElementsByTagName("BODY")[0];
    my_body.classList.add('hidden');
    let burger = document.getElementsByClassName('burger')[0];
    burger.style.display = 'none';
    let close_button = document.getElementsByClassName('close_button')[0];
    close_button.style.display = 'block';
    header.style.visibility = 'visible';
    let fix_mistakes = document.getElementById('fix_mistakes');

    if (fix_mistakes.style.visibility === 'visible') {
        fix_mistakes.style.display = 'none';
    }
}
function closeMenu() {
    let header = document.getElementById('header');
    let menu = header.getElementsByTagName('ul')[0];
    menu.classList.remove('active');
    let my_body = document.getElementsByTagName("BODY")[0];
    my_body.classList.remove('hidden');
    let burger = document.getElementsByClassName('burger')[0];
    let close_button = document.getElementsByClassName('close_button')[0];
    close_button.style.display = 'none';

    let fix_mistakes = document.getElementById('fix_mistakes');

    if (fix_mistakes.style.visibility === 'visible') {
        fix_mistakes.style.display = 'block';
    }

    if (matchMedia) {
    const mq = window.matchMedia("(max-width: 942px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
    }


    function WidthChange(mq) {
        if (mq.matches) {
            burger.style.display = 'block';
            
        } else {
            burger.style.display = 'none';
        }
    }
}

let menu = document.getElementById('menu');
let menu_links = menu.getElementsByTagName('a');
let element;

for (element of menu_links) {
    element.onclick = function() {
        closeMenu();
    }
}