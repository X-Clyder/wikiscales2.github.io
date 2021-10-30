"use strict";

var questions = [
  {
    question: "Один бр! **1)** Чем больше прав и возможностей у каждого участника, тем общество справедливей и честней.<br>**2)**...",
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
    question: "БЕЗ бр! **1)** Чем больше прав и возможностей у каждого участника, тем общество справедливей и честней. **2)**...",
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
    question: "Двойной бр! **1)** Чем больше прав и возможностей у каждого участника, тем общество справедливей и честней.<br><br>**2)**...",
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
    question: "Любая власть должна быть оспоримой, каждый участник должен иметь право написать пост с конструктивной критикой, если ему не нравятся действия определённого члена администрации.",
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
    question: "<span style=color:#ed2d1c>Для необычного</span> <small>автозаполнения</small> тестового и <tt>крутого</tt> шаблона, <sup>помимо</sup> этого <big>используйте</big> конструкцию <code>конструкцию</code> в исходном коде.",
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
  }
];

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
  url = "/results/?" + url;

  location.href = url;
}
