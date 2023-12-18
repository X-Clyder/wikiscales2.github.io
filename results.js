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
  inc: 0,
  delete: 0,
  even: 0,
  imm: 0,
  merge: 0,
  separa: 0,
  meta: 0,
  exo: 0,
  mono: 0,
  poly: 0,
  ref: 0,
  react: 0,
  revo: 0,
  expan: 0
};

var characteristics = [];
var axesValues = {};

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

var charSlogan = {};

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
  inc: getQueryVariable(variable) == 1 ? "/images/1.png" : getQueryVariable(variable) == 0.75 ? "/images/2.png" : getQueryVariable(variable) == 0.5 ? "/images/3.png" : getQueryVariable(variable) == 0.25 ? "/images/4.png" : "/images/default.png",
  delete: getQueryVariable(variable) == 1 ? "/images/2.png" : getQueryVariable(variable) == 0.75 ? "/images/3.png" : getQueryVariable(variable) == 0.5 ? "/images/4.png" : getQueryVariable(variable) == 0.25 ? "/images/5.png" : "/images/default.png",
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

    var yPos = 20;
    
      //Logo
      ctx.beginPath();
      ctx.rect(0, 0, rPreview.width, 42);
      ctx.fillStyle = "#500076";
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 25px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("WikiScales", 10, 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 15px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("wikiscales.github.io", rPreview.width - 10, 27);

      yPos += 48;
       
      /*//Slogan
      ctx.fillStyle = "#000000";
      ctx.font = "25px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(generatedSlogan, rPreview.width / 2.0, yPos + 30);
      yPos += 70;*/

      //Text1
      /*ctx.fillStyle = "#000000";
        ctx.font = "bold 30px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(["Демократизм vs. Авторитаризм"], axeMargin - 60, yPos + 21);*/
        var axeMargin = 200;
        ctx.fillStyle = "#cc0000";
        ctx.font = "bold 30px sans-serif";
        ctx.textAlign = "left";
        /*ctx.fillText(["Демократизм"], axeMargin + 50, yPos + 21);*/
        ctx.fillStyle = "#000000";
        ctx.font = "bold 30px sans-serif";
        ctx.textAlign = "center";
        /*ctx.fillText(["vs."], axeMargin + 300, yPos + 21);*/
        ctx.fillStyle = "#1fad8a";
        ctx.font = "bold 30px sans-serif";
        ctx.textAlign = "left";
        /*ctx.fillText(["Авторитаризм"], axeMargin + 350, yPos + 21);*/

        yPos += 34;
      //==================================
      //Axes1, var axesDrawInfo = [ НЕ КОММЕНТИТЬ
      var axesDrawInfo = [];

      var axeMargin = 200;
      var axeWidth = rPreview.width - axeMargin * 2;
      ctx.strokeStyle = "#888888";
      for (var i = 0; i < axesDrawInfo.length; i++) {
        var negativeValue = getQueryVariable(axesDrawInfo[i]["key"] + "0");
        var positiveValue = getQueryVariable(axesDrawInfo[i]["key"] + "1");
        var neutralValue = 1 - negativeValue - positiveValue;

        var negSize = axeWidth * negativeValue;
        var posSize = axeWidth * positiveValue;
        var ntrSize = axeWidth * neutralValue;

        ctx.beginPath();
        ctx.rect(0.5 + axeMargin + negSize, 0.5 + yPos, ntrSize, 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(0.5 + axeMargin, 0.5 + yPos, negSize, 30);
        ctx.fillStyle = axesDrawInfo[i]["color0"];
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(
          0.5 + rPreview.width - axeMargin - posSize,
          0.5 + yPos,
          posSize,
          30
        );
        ctx.fillStyle = axesDrawInfo[i]["color1"];
        ctx.fill();
        ctx.stroke();

        if (negSize > 40) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "0px sans-serif";
          ctx.textAlign = "right";
          ctx.fillText(
            Math.round(negativeValue * 100) + "%",
            axeMargin + negSize - 5,
            yPos + 23
          );
        }

        if (posSize > 40) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "0px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(
            Math.round(positiveValue * 100) + "%",
            axeMargin + negSize + ntrSize + 5,
            yPos + 23
          );
        }

        if (ntrSize > 40) {
          ctx.fillStyle = "#888888";
          ctx.font = "0px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(
            Math.round(neutralValue * 100) + "%",
            axeMargin + negSize + ntrSize / 2,
            yPos + 23
          );
        }

        /*ctx.drawImage(
          images[axesDrawInfo[i]["key"] + "0"],
          axeMargin - 73,
          yPos - 27
        );
        ctx.drawImage(
          images[axesDrawInfo[i]["key"] + "1"],
          rPreview.width - axeMargin + 73 - 86,
          yPos - 27
        );*/

        ctx.fillStyle = "#000000";
        ctx.font = "20px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(axesDrawInfo[i]["name0"], axeMargin - 10, yPos + 21);

        ctx.textAlign = "right";
        ctx.fillText(
          axesDrawInfo[i]["name1"],
          rPreview.width - axeMargin - 8,
          yPos - 6
        );

        yPos += 34;
      }
    
    /*yPos += 20;*/
    //Text2
    
        ctx.fillStyle = "#000000";
        ctx.font = "bold 30px sans-serif";
        ctx.textAlign = "left";
        /*ctx.fillText(["Свобода vs. Цензура"], axeMargin - 60, yPos + 21);*/

        /*yPos += 34;*/
    //==================================
    //Axes2
    
      var axesDrawInfo = [];

      var axeMargin = 200;
      var axeWidth = rPreview.width - axeMargin * 2;
      ctx.strokeStyle = "#888888";
      for (var i = 0; i < axesDrawInfo.length; i++) {
        var negativeValue = getQueryVariable(axesDrawInfo[i]["key"] + "0");
        var positiveValue = getQueryVariable(axesDrawInfo[i]["key"] + "1");
        var neutralValue = 1 - negativeValue - positiveValue;

        var negSize = axeWidth * negativeValue;
        var posSize = axeWidth * positiveValue;
        var ntrSize = axeWidth * neutralValue;

        ctx.beginPath();
        ctx.rect(0.5 + axeMargin + negSize, 0.5 + yPos, ntrSize, 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(0.5 + axeMargin, 0.5 + yPos, negSize, 30);
        ctx.fillStyle = axesDrawInfo[i]["color0"];
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(
          0.5 + rPreview.width - axeMargin - posSize,
          0.5 + yPos,
          posSize,
          30
        );
        ctx.fillStyle = axesDrawInfo[i]["color1"];
        ctx.fill();
        ctx.stroke();

        if (negSize > 40) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "0px sans-serif";
          ctx.textAlign = "right";
          ctx.fillText(
            Math.round(negativeValue * 100) + "%",
            axeMargin + negSize - 5,
            yPos + 23
          );
        }

        if (posSize > 40) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "0px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(
            Math.round(positiveValue * 100) + "%",
            axeMargin + negSize + ntrSize + 5,
            yPos + 23
          );
        }

        if (ntrSize > 40) {
          ctx.fillStyle = "#888888";
          ctx.font = "0px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(
            Math.round(neutralValue * 100) + "%",
            axeMargin + negSize + ntrSize / 2,
            yPos + 23
          );
        }

        /*ctx.drawImage(
          images[axesDrawInfo[i]["key"] + "0"],
          axeMargin - 73,
          yPos - 27
        );
        ctx.drawImage(
          images[axesDrawInfo[i]["key"] + "1"],
          rPreview.width - axeMargin + 73 - 86,
          yPos - 27
        );*/

        ctx.fillStyle = "#000000";
        ctx.font = "20px sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(axesDrawInfo[i]["name0"], axeMargin - 10, yPos + 21);

        ctx.textAlign = "right";
        ctx.fillText(
          axesDrawInfo[i]["name1"],
          rPreview.width - axeMargin - 8,
          /* yPos - 6 */
        );

        /* yPos += 34; */
      }

      /* МЕДАЛИ */
      var xShift = -50;
      var yShift = 60;
      var numBonus = 0;
      var imagesPerRow = 5;
      var itemSpacing = 80; // Расстояние между каждым элементом

      for (var b in bonus) {
        value = getQueryVariable(b);
        if (value > bonus[b]) {
          if (numBonus > 0 && numBonus % imagesPerRow === 0) {
            // Начинаем новую строку
            yShift += 100 + itemSpacing; // Увеличиваем смещение на 100 (высота изображения) и itemSpacing
            xShift = -50;
          }

          ctx.drawImage(
            images[b],
            rPreview.width / 2 - ((imagesPerRow - 1) * 100) / 2 + xShift - 200,
            yPos - 100 + yShift
          );

          xShift += 100 + itemSpacing; // Увеличиваем смещение на 100 (ширина изображения) и itemSpacing
          numBonus++;
        }
      }
    }
  }

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
  link.download = `WikiScales_Results_${+new Date()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
