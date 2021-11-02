"use strict";

var urlToCopy = document.getElementById("urlToCopy");
if (urlToCopy) {
  urlToCopy.innerHTML = location.href;
}

function shareLink() {
  var urlToCopy = document.getElementById("urlToCopy");
  var urlToCopyContainer = document.getElementById("urlToCopyContainer");

  try {
    if (document.body.createTextRange) {
      // for Internet Explorer
      var range = document.body.createTextRange();
      range.moveToElementText(urlToCopy);
      range.select();
      document.execCommand("Copy");
    } else if (window.getSelection) {
      // other browsers
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(urlToCopy);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("Copy");
    }
    var button = document.getElementById("buttonLink");
    if (button) {
      button.className = "button buttonLinkGood";
      setTimeout(function() {
        var buttonTimeout = document.getElementById("buttonLink");
        if (buttonTimeout) button.className = "button buttonLink";
      }, 2000);
    }
  } catch (err) {}
}

function getQueryVariable(variable) {
  var query = window.atob(window.location.search.substring(1));
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      if (pair[1] == "NaN") {
        return 0;
      } else {
        return pair[1] / 100;
      }
    }
  }
  return 0;
}

function setAxisValue(name, value) {
  var axis = document.getElementById(name);
  if (!axis) return;

  var text = document.getElementById(name + "Text");
  if (!text) return;

  axis.style.width = (100 * value).toFixed(1) + "%";

  text.innerHTML = (100 * value).toFixed(0) + "%";
  if (text.offsetWidth > axis.offsetWidth - 5) text.style.display = "none";
  else text.style.display = "";
}

function setBonus(name, value, limit) {
  var axis = document.getElementById(name);
  if (!axis) return;

  if (value > limit) {
    axis.style.display = "flex";
    axis.style.opacity = value * value;
  } else {
    axis.style.display = "none";
  }
}

var axes = ["c", "b", "p", "m", "s", "j", "t"];

var bonus = {
  inc: 0.5,
  delete: 0.5,
  even: 0.5,
  imm: 0.5,
  merge: 0.5,
  separa: 0.5,
  meta: 0.5,
  exo: 0.5,
  mono: 0.5,
  poly: 0.5,
  ref: 0.5,
  react: 0.5,
  revo: 0.5,
  expan: 0.5
};

var characteristics = [];
var axesValues = {
  c: 0,
  b: 0,
  p: 0,
  m: 0,
  s: 0,
  j: 0,
  t: 0
};

var left = 0;
var right = 0;

for (var i = 0; i < axes.length; i++) {
  var negativeValue = getQueryVariable(axes[i] + "0");
  var positiveValue = getQueryVariable(axes[i] + "1");
  setAxisValue(axes[i] + "AxisNeg", negativeValue);
  setAxisValue(axes[i] + "AxisPos", positiveValue);
  setAxisValue(axes[i] + "AxisMid", 1 - negativeValue - positiveValue);

  left += negativeValue;
  right += positiveValue;

  if (negativeValue > positiveValue) {
    characteristics.push({ name: axes[i] + "0", value: negativeValue });
  } else {
    characteristics.push({ name: axes[i] + "1", value: positiveValue });
  }

  axesValues[axes[i]] = positiveValue - negativeValue;
}

var bonusEnabled = 0;

for (var b in bonus) {
  var value = getQueryVariable(b);

  setBonus(b + "Bonus", value, bonus[b]);

  if (value > bonus[b]) {
    bonusEnabled = 1;
    characteristics.push({ name: b, value: value });
  }
}

characteristics.sort(function(a, b) {
  return a.value < b.value;
});

var charSlogan = {
  b0: "Реабилитация",
  b1: "Порядок",
  c0: "Демократия",
  j0: "Свобода",
  j1: "Этикет",
  s0: "Коллектив",
  s1: "Индивид",
  t0: "Автономия",
  t1: "Викисоюз"
};

function getCharacteristic(name, vmin, vmax) {
  for (var k = 0; k < characteristics.length; k++) {
    if (characteristics[k].name != name) continue;

    if (characteristics[k].value >= vmin && characteristics[k].value <= vmax)
      return characteristics[k].value;
    else return -1.0;
  }

  return -1.0;
}

var generatedSlogan = "";
var sloganDiv = document.getElementById("slogan");
if (sloganDiv) {
  var selectedSlogan = [];

  for (var i = 0; i < characteristics.length; i++) {
    if (
      characteristics[i].value > 0 &&
      charSlogan.hasOwnProperty(characteristics[i].name)
    ) {
      selectedSlogan.push({
        text: charSlogan[characteristics[i].name],
        value: characteristics[i].value
      });
    }
  }

  selectedSlogan.sort(function(a, b) {
    return a.value < b.value;
  });

  var counter = 0;
  for (var i = 0; i < selectedSlogan.length; i++) {
    if (generatedSlogan != "") generatedSlogan += " · ";
    generatedSlogan += selectedSlogan[i].text;
    counter++;

    if (counter >= 3) break;
  }

  sloganDiv.innerHTML = generatedSlogan;
}

if (!bonusEnabled) {
  var bonusBox = document.getElementById("bonusBox");
  bonusBox.style.display = "none";
}

var images = {
  inc: "/images/1.png",
  delete: "/images/222.png",
  even: "/images/3.png",
  imm: "/images/4.png",
  merge: "/images/5.png",
  separa: "/images/6.png",
  meta: "/images/7.png",
  exo: "/images/8.png",
  mono: "/images/9.png",
  poly: "/images/10.png",
  ref: "/images/11.png",
  react: "/images/12.png",
  revo: "/images/13.png",
  expan: "/images/14.png",
};

var numImageLoaded = 0;

function onImageLoaded() {
  numImageLoaded++;

  if (numImageLoaded < images.length) {
    return;
  }

  var rPreview = document.getElementById("generatedResults");
  if (rPreview) {
    var ctx = rPreview.getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, rPreview.width, rPreview.height);
    ctx.fillStyle = "#ebebeb";
    ctx.fill();

    var yPos = 0;
    
      //Logo
      ctx.beginPath();
      ctx.rect(0, 0, rPreview.width, 42);
      ctx.fillStyle = "#500076";
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 25px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("WikiScales2", 10, 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("wikiscales2.github.io", rPreview.width - 10, 27);

      yPos += 48;
       
      //Slogan
      ctx.fillStyle = "#000000";
      ctx.font = "25px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(generatedSlogan, rPreview.width / 2.0, yPos + 30);
      yPos += 70;

      //Axes

      var xShift = 0;
      var numBonus = 0;
      for (var b in bonus) {
        value = getQueryVariable(b);
        if (value > bonus[b]) {
          //numBonus++;
        }
      }

      for (var b in bonus) {
        value = getQueryVariable(b);
        if (value > bonus[b]) {
          ctx.drawImage(
            images[b],
            rPreview.width / 32 + xShift - 40,
            yPos - 50
          );
          xShift += 50;
          yPos += 100;
        }
      }
    }
  }

/*
for (var b in bonus) {
        value = getQueryVariable(b);
        if (value > bonus[b]) {
          ctx.drawImage(
            images[b],
            rPreview.width / 2 - ((numBonus - 1) * 200) / 2 + xShift - 40,
            yPos - 50
          );
          xShift += 50;
        }
      }
    }
  }
  */

for (var b in images) {
  var src = images[b];
  images[b] = new Image();
  images[b].src = src;
  images[b].onload = onImageLoaded;
}

function download_image() {
  var canvas = document.getElementById("generatedResults");
  var link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = `WikiScales2_Results_${+new Date()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
