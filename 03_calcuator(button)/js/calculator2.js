'use strict';

// work variables
let wkFirst = "1";   // 初回フラグ
let wkTotal = 0;     // 合計
let wkCalc = "+";    // 前の演算子
let wkBefore = "1";  // 直前入力 … 0:数値  1:演算子
let afterEqual = false; // = の直後フラグ

// elements
const elementcalcLog = document.getElementById("calcLog"); // ← HTML と同じidに修正
const elementResult = document.getElementById("result");

const num0 = document.getElementById("num0");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");

// それぞれにクリックイベントを設定
num0.addEventListener("click", () => edit(0));
num1.addEventListener("click", () => edit(1));
num2.addEventListener("click", () => edit(2));
num3.addEventListener("click", () => edit(3));
num4.addEventListener("click", () => edit(4));
num5.addEventListener("click", () => edit(5));
num6.addEventListener("click", () => edit(6));
num7.addEventListener("click", () => edit(7));
num8.addEventListener("click", () => edit(8));
num9.addEventListener("click", () => edit(9));


document.getElementById("add").addEventListener("click", () => update("+"));
document.getElementById("sub").addEventListener("click", () => update("-"));
document.getElementById("mult").addEventListener("click", () => update("*"));
document.getElementById("div").addEventListener("click", () => update("/"));
document.getElementById("equal").addEventListener("click", dspResult);
document.getElementById("cancel").addEventListener("click", clear);

// 小数点ボタン（HTMLにid="dot"を追加してください）
const dotBtn = document.getElementById("dot");
if (dotBtn) {
  dotBtn.addEventListener("click", () => {
    if (afterEqual) { // = の直後なら新しい入力
      elementResult.innerHTML = "0.";
      elementcalcLog.innerHTML = "";
      afterEqual = false;
    } else if (wkBefore === "1" || elementResult.innerHTML === "") {
      elementResult.innerHTML = "0.";
    } else if (!elementResult.innerHTML.includes(".")) {
      elementResult.innerHTML += ".";
    }
    wkBefore = "0";
    wkFirst = "0";
  });
}

/** 数字がクリックされたとき */
function edit(num) {
  if (afterEqual) { // = の直後 → 新しい入力
    elementResult.innerHTML = String(num);
    elementcalcLog.innerHTML = "";
    afterEqual = false;
  } else if (wkBefore === "0") {
    // 連続で数字入力 → 右に追加
    elementResult.innerHTML += String(num);
  } else {
    // 演算子の後は新しい数値スタート
    elementResult.innerHTML = String(num);
  }
  wkFirst = "0";
  wkBefore = "0";
}

/** 演算子がクリックされたとき */
function update(calcType) {
  if (wkFirst === "1" && calcType !== "+") return; // 最初は「+」以外無視
  if (wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + elementResult.innerHTML + calcType;
    calculator();
  } else {
    if (wkFirst === "1") {
      elementcalcLog.innerHTML = "0" + calcType;
    } else {
      // 直前が演算子なら置き換え
      elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType;
    }
  }
  wkCalc = calcType;
  wkBefore = "1";
}

/** =がクリックされたとき */
function dspResult() {
  if (wkFirst === "0" && wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + elementResult.innerHTML + "=";
    calculator();
    wkBefore = "1";
  }
}

/** クリア処理 */
function clear() {
  elementResult.innerHTML = "0";
  elementcalcLog.innerHTML = "";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
  afterEqual = false;
}

/** 計算処理 */
function calculator() {
  const currentValue = Number(elementResult.innerHTML);
  if (wkFirst === "1") {
    wkTotal = currentValue;
  } else {
    switch (wkCalc) {
      case "+": wkTotal += currentValue; break;
      case "-": wkTotal -= currentValue; break;
      case "*": wkTotal *= currentValue; break;
      case "/":
        if (currentValue !== 0) {
          wkTotal /= currentValue;
        } else {
          elementResult.innerHTML = "Error";
          return;
        }
        break;
    }
  }
  elementResult.innerHTML = wkTotal;
  wkFirst = "0";
}
