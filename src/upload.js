import { createClient } from '@supabase/supabase-js'
console.log()
let uploadSection = document.querySelector('#upload')

const supabase = createClient(
  'https://afvzbfvprictjgymtsqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmdnpiZnZwcmljdGpneW10c3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MTc4OTksImV4cCI6MjAxOTE5Mzg5OX0.MVOVTPkxa0JC2UfcmQ9gN7PuX4YZe6-tj2YQGVt0smg'
)

// DADOS //

function idCreator() {
  const idImovel = Math.floor(Math.random() * 20000)
  return idImovel
}

async function uploadImovel() {
  modalLoading()
  const idImovel = idCreator()
  const inputEndereco = document.getElementById('endereco').value
  const inputBairro = document.getElementById('bairro').value
  const inputDescricao = document.getElementById('descricao').value
  const inputTamanho = document.getElementById('tamanho').value
  const inputAreaConstruida = document.getElementById('area-construida').value
  const inputPreco = document.getElementById('preco').value
  const telefoneCorretor = document.getElementById('telefone-corretor').value

  const { error } = await supabase
    .from('imoveis')
    .insert([
      {
        id: idImovel,
        endereco: inputEndereco,
        bairro: inputBairro,
        descricao: inputDescricao,
        tamanho: inputTamanho,
        areaConstruida: inputAreaConstruida,
        preco: inputPreco,
        telefoneCorretor: telefoneCorretor
      }
    ])
    .select()
  uploadImages(idImovel)

  // console.log('Enviou')
  clearValueInputs()
  modalLoading()
}

function clearValueInputs() {
  const labels = document.querySelectorAll('label')
  const allInputs = document.querySelectorAll('input')
  const textArea = document.querySelector('textarea')
  textArea.value = ''
  allInputs.forEach(input => {
    input.value = ''
  })

  labels.forEach(label => {
    label.classList.remove('check')
  })
}

// IMAGENS //

async function uploadImages(idImovel) {
  const getImages = document.querySelectorAll('.image')

  const nameUrl = []

  getImages.forEach(async image => {
    if (!image.files[0]) return

    nameUrl.push(image.files[0].name)
    const { data, error } = await supabase.storage
      .from('bucket1')
      .upload(`images/${image.files[0].name}`, image.files[0])
    if (error) {
      console.log(error)
    } else {
      console.log('Sucess')
    }
  })

  getUrlImage(nameUrl, idImovel)
}

function getUrlImage(imgNames, idImage) {
  const urls = []

  imgNames.forEach(urlImg => {
    const { data } = supabase.storage
      .from('bucket1')
      .getPublicUrl(`images/${urlImg}`)
    urls.push(data.publicUrl)
  })

  uploadTableImages(urls, idImage)
}

async function uploadTableImages(urls, idImovel) {
  const { data, error } = await supabase
    .from('imoveis')
    .update({ imagens: { urls } })
    .eq('id', idImovel)
    .select()
}

let btnEnviar = document.querySelector('#btn-enviar')
btnEnviar.addEventListener('click', e => {
  uploadImovel()
})

uploadSection.addEventListener('submit', e => {
  e.preventDefault()
})

const modal = document.querySelector('#modal')
let modalIsActive = false
function modalLoading() {
  if (modalIsActive == false) {
    modal.classList.remove('active')
    console.log('ativou')
    modalIsActive = true
  } else if (modalIsActive == true) {
    modal.classList.add('active')
    console.log('fechou')
    modalIsActive = false
  }
}
