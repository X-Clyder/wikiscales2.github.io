"use strict";
var questions;

/*questions = [
  {
    "question": "Первый естовый вопрос.",
    "answers": {
      "text1": "Да",
      "text2": false,
      "text3": "Я хз",
      "text4": false,
      "text5": "Канеш ноу ноу ноу",
      "weight": [1, 0, 0, 0, -1]
    },
    "effect": {
      "meta": 10,
      "stat": 0,
      "auth": 0,
      "part": 0
    }
  },
  {
    "question": "Второй тест222.",
    "answers": {
      "text1": "Да",
      "text2": false,
      "text3": "Я хз",
      "text4": false,
      "text5": "Канеш ноу ноу ноу",
      "weight": [1, 0, 0, 0, -1]
    },
    "effect": {
      "ptnl": 10,
      "stat": 0,
      "auth": 0,
      "part": 0
    }
  }
];*/

/*var questions = [
  {
    question: "Чем больше прав и возможностей у каждого участника, тем общество справедливей и честней.",
    answer: 0,
    valuesYes: [
      {
        axis: "c0",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "c1",
        value: 3
      }
    ]
  },
  {
    question: "Любая власть должна быть оспоримой.",
    answer: 0,
    valuesYes: [
      {
        axis: "c0",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "c1",
        value: 3
      }
    ]
  },
  {
    question: "Проводить различные реформы нужно только при их одобрении их народом (большим количеством участников), посредством проведения голосований/референдумов; каждый участник должен иметь право голоса и право свободно участвовать в таком голосовании/референдуме.",
    answer: 0,
    valuesYes: [
      {
        axis: "c0",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "c1",
        value: 3
      }
    ]
  },
  {
    question: "Назначать новых руководителей википроекта лучше всего посредством проведения соответствующих голосований на вики, вместо того чтобы оставлять это решение на усмотрение действующего(-их) бюрократа(-ов).",
    answer: 0,
    valuesYes: [
      {
        axis: "c0",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "c1",
        value: 3
      }
    ]
  },
  {
    question: "Все некачественные, короткие, либо плохо оформленные статьи следует непременно подвергать удалению (НЕ согласен — все подобные статьи следует улучшать и дорабатывать, вместо того чтобы удалять; к удалению любых статей следует прибегать как можно реже).",
    answer: 0,
    valuesYes: [
      {
        axis: "delete",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "inc",
        value: 3
      }
    ]
  },
  {
    question: "В процессе работы на вики, я стремлюсь к созданию полностью готовой и оформленной статьи всего одной большой правкой (НЕ согласен — я предпочитаю править статьи постепенно, внося мелкие правки раз за разом).",
    answer: 0,
    valuesYes: [
      {
        axis: "mono",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "poly",
        value: 3
      }
    ]
  }
];*/

var qn = 0; // Question number
var prev_answer = null;

ini_question = function() {
  document.getElementById("question-text").innerHTML = questions[qn].question; //Sets question text
  document.getElementById("question-number").innerHTML = "Question " + (qn + 1) + " of " + questions.length; // Sets question number
  //Disables back button if answers is empty
  if (answers.length === 0) {
    document.getElementById("back_button").style.display = "none";
    document.getElementById("back_button_off").style.display = "block";
  } else {
    document.getElementById("back_button").style.display = "block";
    document.getElementById("back_button_off").style.display = "none";
  }
  if (questions[qn].answers.text1 !== false) {
    document.getElementById("button1").style.display = "block";
    document.getElementById("button1").innerHTML = questions[qn].answers.text1;
  } else {
    document.getElementById("button1").style.display = "none";
  }
  if (questions[qn].answers.text2 !== false) {
    document.getElementById("button2").style.display = "block";
    document.getElementById("button2").innerHTML = questions[qn].answers.text2;
  } else {
    document.getElementById("button2").style.display = "none";
  }
  if (questions[qn].answers.text3 !== false) {
    document.getElementById("button3").style.display = "block";
    document.getElementById("button3").innerHTML = questions[qn].answers.text3;
  } else {
    document.getElementById("button3").style.display = "none";
  }
  if (questions[qn].answers.text4 !== false) {
    document.getElementById("button4").style.display = "block";
    document.getElementById("button4").innerHTML = questions[qn].answers.text4;
  } else {
    document.getElementById("button4").style.display = "none";
  }
  if (questions[qn].answers.text5 !== false) {
    document.getElementById("button5").style.display = "block";
    return document.getElementById("button5").innerHTML = questions[qn].answers.text5;
  } else {
    return document.getElementById("button5").style.display = "none";
  }
};

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
  url = "/results/?" + url;

  location.href = url;
}
