const form = document.querySelector("#form");

const select = document.querySelector("#codigoSelect");
const codigo = document.querySelector("#codigo");

const preview = document.querySelector("#preview");
const file = document.querySelector("#myFile");

document.addEventListener("DOMContentLoaded", (e) => {
  fetchCountrycodigos();
});

//CODIGOS INTERNACIONALES -----------------------------------
const fetchCountrycodigos = async () => {
  try {
    const res = await fetch("../../helpers/countrycodigos.json");
    const data = await res.json();
    cargarcodigos(data);
  } catch (error) {
    console.log(error);
  }
};

const cargarcodigos = (data) => {
  select.textContent = "Codigo Pais";
  data.forEach((pais) => {
    let opt = document.createElement("option");
    opt.value = pais.dial_codigo;
    opt.text = pais.name;
    select.appendChild(opt);
  });
};

const seleccionarcodigo = () => {
  const indice = select.selectedIndex;
  if (indice === -1) return;
  const paiSeleccionado = select.options[indice];
  codigo.value = paiSeleccionado.value;
};

select.addEventListener("change", seleccionarcodigo);

//IMAGENES -----------------------------------
const renderImage = (formData) => {
  const file = formData.get("myFile");
  const myFile = URL.createObjectURL(file);
  preview.setAttribute("src", myFile);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  fetch("/signup", {
    method: "POST",
    body: formData,
  });
  form.reset();
});
