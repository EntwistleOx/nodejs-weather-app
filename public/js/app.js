const skycons = new Skycons({"color": "gray"})
const icon = document.getElementById('icon');
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    skycons.remove('icon')
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            skycons.add(icon, data.icon);
            skycons.play();
        })
    })
})

