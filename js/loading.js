// 로딩 이미지 생성
function loading(loadingLocation) {
  const loadingImg = document.createElement("div");
  loadingImg.className = "loadingImg";
  loadingImg.innerHTML = '<img src="./img/loading_image.gif">';
  // 로딩중 레이어 추가
  loadingLocation.appendChild(loadingImg);
  // 로딩중 이미지 표시
  loadingImg.style.display = "block";
}

// 로딩 이미지 숨기기
function closeLoading() {
  document.querySelector(".loadingImg").remove();
}
