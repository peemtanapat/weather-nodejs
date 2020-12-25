const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    event.preventDefault()

    const location = search.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
                return console.log({ error: data.error })
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        })
    })
})
