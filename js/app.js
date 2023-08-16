import dataImages from "./mockData.js";
const navBtn = document.querySelector("#navBtn");
const closeBtn = document.querySelector("#closeBtn");
const sidebar = document.querySelector("#sidebarMobile");
const btnInformations = document.querySelector("#btnInformations")
const modal = document.querySelector("#modal")
const cardsGroup = document.querySelector(".cardsGroup");
const tableGroup = document.querySelector(".table")
const blocks = document.querySelector("#cardGray");
const sold = document.querySelector("#cardRed");
const reserved = document.querySelector("#cardOrange");
const available = document.querySelector("#cardGreen");

btnInformations.addEventListener("click", function () {
  modal.style.display = modal.style.display === 'none' ? 'block' : 'none'
});

navBtn.addEventListener("click", function () {
  sidebar.classList.add("show-sidebar");
});

closeBtn.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
});

blocks.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
  filterResultsByAvailability("bloqueada");
});

sold.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
  filterResultsByAvailability("vendida");
});

reserved.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
  filterResultsByAvailability("reservada");
});

available.addEventListener("click", function () {
  sidebar.classList.remove("show-sidebar");
  filterResultsByAvailability("disponivel");
});

const cardToHtml = (data) => {
  const card = document.createElement('aside');
  card.className = "card";
  card.innerHTML = `
  <div class="cardHeader">
  <p>${data.bloco}</p>
</div>
<div class="card-footer">
  <div class="spaceValues">
    <div class="">
      <span> Quartos: </span>
    </div>
    <div>
    <span> ${data.qtdQuartos} </span>
    </div>
  </div>
  
  <div class="spaceValues">
    <div>
    <span>  Andar: </span>
    </div>
    <div>
      ${data.andar}
    </div>
  </div>
  <div class="spaceValues">
    <div>
      Área:
    </div>
    <div>
      ${data.areaTotal}
    </div>
  </div>
  <div class="spaceValues">
    <div>
      Coluna:
    </div>
    <div>
     ${data.coluna}
    </div>
  </div>
</div>
 <div class="disponibility ${data.estado}">
    <span>${data.estado}</span>
  </div>
  `;
  return card;
}

const tableToHtml = (data) => {
  const table = document.createElement('tr');
  table.className = "tableStyle"
  table.innerHTML = `
    <td class="roundedTable detailsTable">${data.bloco}</td>
    <td class="detailsTable">${data.qtdQuartos}</td>
    <td class="detailsTable">${data.andar}</td>
    <td class="detailsTable">${data.areaTotal}</td>
    <td>${data.coluna}</td>
    <td class="roundedTableEnd ${data.estado}">${data.estado}</td>
  `;
  return table;
}


dataImages.map(data => {
  const card = cardToHtml(data);
  const table = tableToHtml(data)
  cardsGroup.appendChild(card)
  tableGroup.appendChild(table)
})

const filterResultsByAvailability = (availability) => {
  const filteredResults = dataImages.filter(data => data.estado.toLowerCase() === availability);
  cardsGroup.innerHTML = "";
  tableGroup.innerHTML = `  
    <tr>
      <th>BLOCO</th>
      <th>QTD. QUARTOS</th>
      <th>ANDAR</th>
      <th>ÁREA TOTAL</th>
      <th>COLUNA</th>
      <th>ESTADO</th>
    </tr>`;

  filteredResults.forEach(data => {
    const card = cardToHtml(data);
    const table = tableToHtml(data)
    cardsGroup.appendChild(card)
    tableGroup.appendChild(table)
  });
};