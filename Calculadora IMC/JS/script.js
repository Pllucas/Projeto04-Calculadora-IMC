/* IMC DATA */
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
]; //Dados obtidos por uma API



/* Seleção de elementos */
const tabelaImc = document.querySelector("#table-imc");//parte que sera preenchida pelos dados da API


const alturaInput = document.querySelector("#height");  
const pesoInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const limparBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calculadora-container");


// 2 parte - Result container
const ResultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const voltarBtn = document.querySelector("#back-btn"); 
//Result-container, from to the table


/* Funções */
const createTable = (data) => {
    data.forEach((item) => {
        
        const div = document.createElement("div")
        div.classList.add("table-data");

        const classification = document.createElement("p")
        classification.innerHTML = item.classification;

        const info = document.createElement("p")
        info.innerHTML = item.info;

        const obesity = document.createElement("p")
        obesity.innerHTML = item.obesity;


        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        tabelaImc.appendChild(div);

    });
}


const cleanInput = () => {

    alturaInput.value = "";
    pesoInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList= "";

}; // limpar inputs



const valiDigits = (text) => {

    return text.replace(/[^0-9,]/g, "")

};// impossibilitar o uso de letras, somente números 



const calcImc = (altura,peso) => {

  const imc = (peso / (altura * altura)).toFixed();
  return imc;


}// para não sobrecarregar o codigo do evento calcbtn, essa function reduz o riscos de afetar o codigp



const showOrHideResults = () => {
  calcContainer.classList.toggle("hide");
  ResultContainer.classList.toggle("hide");

}

/* Inicialização */ 
createTable(data);



/* Eventos */
limparBtn.addEventListener("click", (e) => {
  e.preventDefault()

  cleanInput()
    
});// limpar inputs



[alturaInput, pesoInput].forEach( (el) => {
    el.addEventListener("input", (e) => {
        
        const updateValue = valiDigits(e.target.value)

        e.target.value = updateValue;
    })
});// impossibilitar o uso de letras, somente números 



calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const altura = +alturaInput.value.replace(",",".");
  const peso = +pesoInput.value.replace(",",".");

  if(!altura || !peso) return;

  const imc = calcImc(altura,peso);

  
  let info;

  data.forEach((item) => {
    if(imc >= item.min && imc <= item.max){
      info = item.info
    }
  })

  if(!info)return;

  imcNumber.innerHTML = imc
  imcInfo.innerHTML = info

  switch(info){
    case "Magreza":
    imcNumber.classList.add("low");
    imcInfo.classList.add("low");
    break

    case "Normal":
    imcNumber.classList.add("good");
    imcInfo.classList.add("good");
    break

    case "Sobrepeso":
    imcNumber.classList.add("low");
    imcInfo.classList.add("low");
    break

    case "Obesidade":
    imcNumber.classList.add("medium");
    imcInfo.classList.add("medium");
    break

    case "Obesidade grave":
    imcNumber.classList.add("heigh");
    imcInfo.classList.add("heigh");
    break
  }
  
  showOrHideResults()
}); // btn para calcular(junto com a function) o IMC da pessoal

voltarBtn.addEventListener("click", ()=> {
  
  cleanInput()
  showOrHideResults() = ""
  
})