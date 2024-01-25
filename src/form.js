export function form() {
  return `   
      <form action="" id="upload">
        <h1>Imovel dados</h1>
        <h2>Imagens</h2>
        <div class="images-section">
          <label for="image1">+</label>
          <input type="file" id="image1" class="image" />
          <label for="image2">+</label>
          <input type="file" id="image2" class="image" />
          <label for="image3">+</label>
          <input type="file" id="image3" class="image" />
          <label for="image4">+</label>
          <input type="file" id="image4" class="image" />
          <label for="image5">+</label>
          <input type="file" id="image5" class="image" />
          <label for="image6">+</label>
          <input type="file" id="image6" class="image" />
          <label for="image7">+</label>
          <input type="file" id="image7" class="image" />
          <label for="image8">+</label>
          <input type="file" id="image8" class="image" />
        </div>
        <input type="text" id="preco" placeholder="Preço" />
        <input type="text" id="endereco" placeholder="Endereço" />
        <input type="text" id="bairro" placeholder="Bairro" />
        <div class="info-size">
          <input type="text" id="tamanho" placeholder="Tamanho" />
          <input type="text" id="area-construida" 
          placeholder="Área  Construida" />
          </div>
          <input type="number" id="telefone-corretor" 
          placeholder="Telefone para contato" />
        <textarea
          id="descricao"
          name="descricao"
          id=""
          cols="30"
          rows="10"
          placeholder="Descrição"
        ></textarea>
        <button id="btn-enviar">Enviar</button>
        </form>
        <div id="modal" class="active">
          <span>Enviando...</span>
        </div>
        `
}
