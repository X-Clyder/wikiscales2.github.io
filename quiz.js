"use strict";
/*
      {
        axis: "delete",
        value: 3
      },
      {
        axis: "meta",
        value: 3
      },
      {
        axis: "imm",
        value: 3
      },
      {
        axis: "poly",
        value: 3
      }
*/
var questions = [
  {
    question: "<h1><b>Устройство общества</b></h1><b>1)</b> Назначать новых руководителей википроекта необходимо исключительно демократическим путём, посредством проведения соответствующих честных и справедливых голосований на вики.<br><br><b>2)</b> Руководители вики чаще всего должны избираться на голосованиях, но в случаях, когда это сделать затруднительно, можно доверить данное решение действующему(-им) бюрократу(-ам).<br><br><b>3)</b> Желательно оставлять решение по назначению новых руководителей вики на усмотрение действующего(-их) бюрократа(-ов), но в редких случаях можно предоставить возможность выбрать нового лидера и обычным участникам.<br><br><b>4)</b> Руководители википроекта всегда должны назначаться исключительно по решению действующего(-их) бюрократа(-ов).",
    answer: 0,
    valuesYes: [
      {
        axis: "inc",
        value: 2
      },
      {
        axis: "delete",
        value: 2
      },
      {
        axis: "even",
        value: 3
      },
      {
        axis: "imm",
        value: 3
      },
      {
        axis: "merge",
        value: 2
      },
      {
        axis: "separa",
        value: 2
      },
      {
        axis: "meta",
        value: 3
      },
      {
        axis: "exo",
        value: 3
      },
      {
        axis: "mono",
        value: 3
      },
      {
        axis: "poly",
        value: 3
      },
      {
        axis: "ref",
        value: 3
      },
      {
        axis: "react",
        value: 3
      }
    ],
    valuesNo: [
      {
        axis: "c0",
        value: 2
      }
    ]
  },
  {
    question: "123.",
    answer: 0,
    valuesYes: [
      {
        axis: "revo",
        value: 2
      },
      {
        axis: "expan",
        value: 2
      }
    ],
    valuesNo: [
      {
        axis: "j1",
        value: 2
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
