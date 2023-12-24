var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var searchField = document.getElementById("searchField");

var submitBtn = document.querySelector("#submitBtn");
var updateBtn = document.querySelector("#updateBtn");

var indexOfUpdatedData = 0;

updateBtn.style.display = "none";

var websitesList = [];

if (localStorage.getItem("websitesList") !== null) {
  websitesList = JSON.parse(localStorage.getItem("websitesList"));
  showData();
}

function addWebsite() {
  var website = {
    name: siteName.value,
    url: siteUrl.value,
  };

  if (nameValidation() === true && urlValidation() === true) {
    websitesList.push(website);
    showData();
    localStorage.setItem("websitesList", JSON.stringify(websitesList));
    siteName.value = "";
    siteUrl.value = "";
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.remove("is-invalid");
  }
}

function showData() {
  var temp = "";

  for (var i = 0; i < websitesList.length; i++) {
    temp += `
        <tr>
            <td>${i + 1}</td>
            <td>${websitesList[i].name}</td>
            <td><button class="btn v-btn px-4"><a class="text-decoration-none text-light" target="_blank" href="${
              websitesList[i].url
            }"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
            <td><button class="btn d-btn" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
            <td><button class="btn u-btn" onclick="updateInTable(${i})"><i class="fa-solid fa-pencil"></i> Update</button></td>
        </tr>
        `;
  }

  document.getElementById("tableData").innerHTML = temp;
}

function deleteItem(index) {
  websitesList.splice(index, 1);
  localStorage.setItem("websitesList", JSON.stringify(websitesList));
  showData();
}

function updateInTable(index) {
  updateBtn.style.display = "inline-block";
  submitBtn.style.display = "none";
  indexOfUpdatedData = index;

  siteName.value = websitesList[index].name;
  siteUrl.value = websitesList[index].url;
}

function updateData() {
  if (nameValidation() === true && urlValidation() === true) {
    updateBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
    websitesList[indexOfUpdatedData].name = siteName.value;
    websitesList[indexOfUpdatedData].url = siteUrl.value;
    showData();
    localStorage.setItem("websitesList", JSON.stringify(websitesList));
    siteName.value = "";
    siteUrl.value = "";
  }
}

var form = document.getElementById("myForm");
function handleForm(event) {
  event.preventDefault();
}
form.addEventListener("submit", handleForm);

function searchFunc() {
  var filtered = "";
  for (var i = 0; i < websitesList.length; i++) {
    if (searchField.value === websitesList[i].name) {
      filtered = `<tr>
            <td>${i + 1}</td>
            <td>${websitesList[i].name}</td>
            <td><button class="btn v-btn px-4"><a class="text-decoration-none text-light" target="_blank" href="${
              websitesList[i].url
            }"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
            <td><button class="btn d-btn" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
            <td><button class="btn u-btn" onclick="updateInTable(${i})"><i class="fa-solid fa-pencil"></i> Update</button></td>
        </tr>`;
      showData();
      return (document.getElementById("tableData").innerHTML = filtered);
    } else {
      showData();
    }
  }
}

searchField.addEventListener("keyup", searchFunc);

function nameValidation() {
  var nameRegex = /^[a-z]{3,20}$/;

  if (nameRegex.test(siteName.value) == true) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

siteName.addEventListener("blur", nameValidation);

function urlValidation() {
  var urlRegex = /(http|https?):\/\/[^ "]+$/;
  if (urlRegex.test(siteUrl.value) == true) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    return false;
  }
}

siteUrl.addEventListener("blur", urlValidation);