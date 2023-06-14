// 답변 모달 열기
function openModal() {
  // 모달 열기
  document.querySelector(".modal").style.display = "block";
  // 모달이 나타난 후에 모달 닫기 버튼 활성화
  document.querySelector(".close").addEventListener("click", closeModal);
}

// 답변 모달 닫기
function closeModal() {
  document.querySelector(".modal").style.display = "none";
}
