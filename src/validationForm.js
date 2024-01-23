const inputTypeFile = document.querySelectorAll('input[type="file"]')

inputTypeFile.forEach(element => {
  element.addEventListener('change', e => {
    const fileImage = e.target.files[0]
    let reader = new FileReader()

    const inputId = e.target.id

    reader.onloadend = function () {
      checked(inputId, reader.result)
    }

    if (fileImage) {
      reader.readAsDataURL(fileImage)
    } 
  })
})

function checked(idLabel, img) {
  const label = document.querySelector(`label[for="${idLabel}"]`)
  label.innerHTML = ''
  label.style = `background-image: url(${img}); background-repeat: no-repeat;
  background-size: cover; `
}
