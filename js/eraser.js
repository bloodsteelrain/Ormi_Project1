// 직전 질문과 답변 제거
function clearAnswers(container1, container2) {
  // 답변 표시 지우기
  container1.innerHTML = "";
  container2.innerHTML = "";
  $modalButtons.style.display = "none";

  // data 배열에서 마지막 두 항목 제거하기
  data.splice(data.length - 4, 4);
}
