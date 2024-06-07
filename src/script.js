const navbarLinks =
    document.querySelectorAll('nav a')
const sections =
    document.querySelectorAll('section')
const alertMessage = document.getElementById('alert-message')
const alertBtn = document.getElementById('alert-btn')
const scriptURL =
    'https://script.google.com/macros/s/AKfycbwezbj-Yj-vIsB4gW_b66_XKpIh6jTzgz2qe8m0fx7tVMcL4h8ZfETGzL0omjGnyTJmkw/exec'
const form = document.forms['contact-form']
const spinner = document.querySelector(".animate-spin")

const appendAlert = (message, color) => {
    alertMessage.innerHTML = `<div class="bg-${color}-500 rounded-md flex justify-between items-center px-4 py-2 text-white mb-6 close">
            <div>${message}</div>
            <button type="button">
                    <i class='bi bi-x-lg text-lg text-white'></i>
            </button>
        </div>`
}

form.addEventListener('submit', e => {
    e.preventDefault()
    alertBtn.toggleAttribute("disabled")
    spinner.classList.toggle("hidden")
    fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(() => {
            alertBtn.toggleAttribute("disabled")
            spinner.classList.toggle("hidden")
            appendAlert('The Message landed successfuly!', 'lime')
            form.reset()
        })
        .catch(() => {
            alertBtn.toggleAttribute("disabled")
            spinner.classList.toggle("hidden")
            appendAlert(error.message, 'red')
        })
})

window.addEventListener('scroll', () => {
    const currentPos = window.scrollY

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 50
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')
        const header = document.querySelector('header')

        if (currentPos >= sectionTop &&
            currentPos < sectionTop + sectionHeight) {
            navbarLinks.forEach(function (navbarLink) {
                navbarLink.classList.remove('active')
            });

            document.querySelector('nav a[href="#' +
                    sectionId + '"]')
                .classList.add('active')
            switch (sectionId) {
                case "about":
                    header.style.backgroundColor = "#38bdf8"
                    header.style.color = "#0284c7"
                    break
                case "skills":
                    header.style.backgroundColor = "#0ea5e9"
                    header.style.color = "#7dd3fc"
                    break
                case "contact":
                    header.style.backgroundColor = "#0284c7"
                    header.style.color = "#7dd3fc"
                    break
                default:
                    header.style.backgroundColor = "#7dd3fc"
                    header.style.color = "#0284c7"
                    break
            }
        }
    })
})

document.addEventListener('click', e => {
    let btn = document.querySelector('nav i')

    try {
        if (btn.classList.toggle('clicked') && e.target === btn) {
            document.body.innerHTML += `<div class='navbar fixed inset-0 bg-sky-400 z-20 flex flex-col justify-center items-center gap-12 text-xl'>
                <a class='text-sky-600 hover:text-white transition-colors' href="#home">Home</a>
                <a class='text-sky-600 hover:text-white transition-colors' href="#about">About Me</a>
                <a class='text-sky-600 hover:text-white transition-colors' href="#skills">My Skills</a>
                <a class='text-sky-600 hover:text-white transition-colors' href="#contact">Contact Me</a>
                <button class='absolute top-6 right-6 text-3xl' type="button">
                    <i class="close bi bi-x-lg text-white"></i>
                </button>
            </div>`
        } else {
            document.querySelector('.close').remove()
            btn.classList.remove('clicked')
            document.querySelector('.navbar').remove()
        }
    } catch {
        return
    }
})