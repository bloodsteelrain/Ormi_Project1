// 스크롤 이벤트리스너 등록
window.addEventListener("scroll", function () {
  // 현재 스크롤 위치 확인
  const scrollPosition = window.scrollY;
  // 스크롤 위치가 200px 이상일 때 '위로' 버튼 보이기
  if (scrollPosition >= 200) {
    $topButton.style.display = "block";
  } else {
    $topButton.style.display = "none";
  }
});

// '위로' 버튼 클릭 시 페이지 맨 위로 스크롤 이동
$topButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 모든 #링크에 대해 스무스 스크롤 이벤트리스너 등록
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // 클릭한 링크의 href 값을 가져오기
    const target = document.querySelector(this.getAttribute("href"));

    // 스크롤 애니메이션 적용
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});
