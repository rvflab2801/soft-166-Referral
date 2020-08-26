function switchLightOn(checkColor) {
  var lightCommandColor = [
    { on: true, hue: 65535 },
    { on: true, hue: 46920 },
    { on: true, hue: 25500 },
    { on: true, hue: 33333 },
    { on: true, hue: 12299 },
  ]
  var lightCommandOff = { on: false }
  var URI =
    "http://192.168.0.50/api/stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz/lights/%blbNo%/state/"

  if (checkColor == 1) {
    for (let index = 1; index < 7; index++) {
      $.ajax({
        url: URI.replace(`%blbNo%`, index), //uses variable lightURI
        type: "PUT",
        data: JSON.stringify(lightCommandColor[index - 1]), //translates contents of lightCommand variable into jSON code
      })
    }
  } else {
    for (let index = 1; index < 7; index++) {
      if (index == 1) {
        console.log(URI.replace(`%blbNo%`, index), "RANG RANG")
        $.ajax({
          url: URI.replace(`%blbNo%`, index), //uses variable lightURI
          type: "PUT",
          data: JSON.stringify(lightCommandColor[checkColor]), //translates contents of lightCommand variable into jSON code
        })
      } else {
        console.log(URI.replace(`%blbNo%`, index))
        $.ajax({
          url: URI.replace(`%blbNo%`, index), //uses variable lightURI
          type: "PUT",
          data: JSON.stringify(lightCommandOff), //translates contents of lightCommand variable into jSON code
        })
      }
    }
  }
}

//Show Password

function showPass() {
  var pass = document.querySelector("#inpFeild").value,
    newHtml,
    check,
    symCheck = 0,
    space = 0,
    isalp = 0,
    isnum = 0,
    issym = 0,
    html = "%text%",
    symbols = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "=",
      "+",
    ] //Symbols to check

  if (pass.length > 8) {
    //Checking the values
    for (var i = 0; i < pass.length; i++) {
      if (pass[i] == " ") {
        space = 1
      }
      if (!isNaN(pass[i])) {
        isnum = 1
      }
      if (isNaN(pass[i])) {
        symCheck = 0
        symbols.forEach(function (e) {
          if (pass[i] == e) {
            symCheck = 1
          }
        })
        if (symCheck == 1) {
          issym = 1
        } else {
          isalp = 1
        }
      }
    }

    check = issym + isalp + isnum

    //SPACE IN PASSWORD

    if (space == 1) {
      newHtml = html.replace("%text%", "Can not have space in password")
      document.querySelector("#result").textContent = newHtml
      switchLightOn(4)
    } else {
      switch (check) {
        case 1:
          newHtml = html.replace("%text%", "Weak")
          document.querySelector("#result").textContent = newHtml
          switchLightOn(1)

          break
        case 2:
          newHtml = html.replace("%text%", "Moderate")
          document.querySelector("#result").textContent = newHtml
          switchLightOn(2)

          break
        case 3:
          newHtml = html.replace("%text%", "Strong")
          document.querySelector("#result").textContent = newHtml
          switchLightOn(3)

          break
      }
    }
  }

  //SHORT PASSWORD
  else {
    newHtml = html.replace(
      "%text%",
      "Not enough characters, Minimum 9 characters required"
    )
    document.querySelector("#result").textContent = newHtml
    switchLightOn(5)
  }
}

//Changing Pages

function pageChanger(pgNum) {
  if (pgNum === 2) {
    document.querySelector("#result").classList.add("showPage")
    document.querySelector("#inpFeild").value = ""
    document.querySelector("#result").textContent = ""
  } else {
    document.querySelector("#result").classList.remove("showPage")
  }

  document.querySelector(`#changeBtn-${pgNum}`).classList.add("show")
  document.querySelector(`#page-${pgNum}`).classList.add("showPage")
  for (var x = 1; x < 5; x++) {
    if (x != pgNum) {
      document.querySelector("#changeBtn-" + x).classList.remove("show")
      document.querySelector("#page-" + x).classList.remove("showPage")
    }
  }
}

//Event Listners

document.querySelector("#checkBtn").addEventListener("click", showPass)
document.addEventListener("keyup", function (event) {
  //ENTER key press
  if (event.keyCode == 13) {
    showPass()
  }
})
//Page1
document
  .querySelector("#changeBtn-1")
  .addEventListener("click", () => pageChanger(1))
//Page2
document
  .querySelector("#changeBtn-2")
  .addEventListener("click", () => pageChanger(2))
//Page3
document
  .querySelector("#changeBtn-3")
  .addEventListener("click", () => pageChanger(3))
//Page4
document
  .querySelector("#changeBtn-4")
  .addEventListener("click", () => pageChanger(4))
//Page2
document
  .querySelector("#homePlay")
  .addEventListener("click", () => pageChanger(2))
