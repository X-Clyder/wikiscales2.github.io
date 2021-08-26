"use strict";

var questions = [
    //Valid questionTypes: customNumber, smallSelection, bigSelection, customText
    {
    "id": 1,
    "question": "How would you classify yourself as?",
    "questionType": "smallSelection",
    "answers":[
        {
        "label": "Authoritarian Left",
        "color": "#990000",
        "effect": "AuthLeft"
        },
        {
        "label": "Authoritarian Right",
        "color": "#003399",
        "effect": "AuthRight"
        },
        {
        "label": "Centrist",
        "color": "#999999",
        "effect": "Centrist"
        },
        {
        "label": "Libertarian Left",
        "color": "#339900",
        "effect": "LibLeft"
        },
        {
        "label": "Libertarian Right",
        "color": "#999900",
        "effect": "LibRight"
        },
        {
        "label": "Unaffiliated / Don't know",
        "color": "#999999",
        "effect": null
        }]
    },
    {
    "id": 2,
    "question": "How would you classify yourself as?",
    "questionType": "smallSelection",
    "answers":[
        {
        "label": "Authoritarian",
        "color": "#6d4cb0",
        "effect": "Auth"
        },
        {
        "label": "Rightist",
        "color": "#4c96af",
        "effect": "Right"
        },
        {
        "label": "Centrist",
        "color": "#999999",
        "effect": "Centrist"
        },
        {
        "label": "Leftist",
        "color": "#af4c4c",
        "effect": "Left"
        },
        {
        "label": "Libertarian",
        "color": "#4caf50",
        "effect": "Lib"
        },
        {
        "label": "Unaffiliated / Don't know",
        "color": "#999999",
        "effect": null
        }]
    },
    {
    "id": 3,
    "question": "How do you view yourself on Culture?",
    "questionType": "smallSelection",
    "answers":[
        {
        "label": "Very Progressive",
        "color": "#1b5e20",
        "effect": 3
        },
        {
        "label": "Progressive",
        "color": "#4caf50",
        "effect": 2
        },
        {
        "label": "Leaning Progressive",
        "color": "#7ae67e",
        "effect": 1
        },
        {
        "label": "Neutral",
        "color": "#a9a9a9",
        "effect": 0
        },
        {
        "label": "Leaning Conservative",
        "color": "#7acbe6",
        "effect": -1
        },
        {
        "label": "Conservative",
        "color": "#4c96af",
        "effect": -2
        },
        {
        "label": "Very Conservative",
        "color": "#1b4e5e",
        "effect": -3
        },
        {
        "label": "Don't Know / Refuse",
        "color": "#a9a9a9",
        "effect": null
        }]
    },
]
    
var qn = 0; // Question number
var prev_answer = null;

function shuffle(array) {
  var i = 0,
    j = 0,
    temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
shuffle(questions);

init_question();

function init_question() {
  document.getElementById("question-text").innerHTML = questions[qn].question;
  document.getElementById(
    "question-number"
  ).innerHTML = "Вопрос %num% из %sum%"
    .replace("%num%", qn + 1)
    .replace("%sum%", questions.length);
  if (qn == 0) {
    document.getElementById("back_button").style.display = "none";
    document.getElementById("back_button_off").style.display = "block";
  } else {
    document.getElementById("back_button").style.display = "block";
    document.getElementById("back_button_off").style.display = "none";
  }
}

function next_question(mult) {
  questions[qn].answer = mult;
  qn++;

  if (qn < questions.length) {
    init_question();
  } else {
    results();
  }
}
function prev_question() {
  if (qn == 0) {
    return;
  }
  qn--;
  init_question();
}

function calc_score(score, max_value) {
  return ((100 * score) / max_value).toFixed(0);
}

function results() {
  var axes = {};

  for (var i = 0; i < questions.length; i++) {
    var q = questions[i];

    for (var j = 0; j < q.valuesYes.length; j++) {
      var a = q.valuesYes[j];
      if (!(a.axis in axes)) {
        axes[a.axis] = {
          val: 0,
          sum: 0
        };
      }

      if (q.answer > 0) {
        axes[a.axis].val += q.answer * a.value;
      }
      axes[a.axis].sum += Math.max(a.value, 0);
    }

    for (var j = 0; j < q.valuesNo.length; j++) {
      var a = q.valuesNo[j];
      if (!(a.axis in axes)) {
        axes[a.axis] = {
          val: 0,
          sum: 0
        };
      }

      if (q.answer < 0) {
        axes[a.axis].val -= q.answer * a.value;
      }
      axes[a.axis].sum += Math.max(a.value, 0);
    }
  }

  var url = "";
  for (var aK in axes) {
    if (axes[aK].val > 0) {
      if (url != "") url += "&";
      url += aK + "=" + calc_score(axes[aK].val, axes[aK].sum);
    }
  }
  url = window.btoa(url);
  url = "/results2/?" + url;

  location.href = url;
}
