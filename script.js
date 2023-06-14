const $plotContainer = document.querySelector(".plotContainer");
const $topicInput = document.querySelector(".topicInput");
const $genreInput = document.querySelector(".genreInput");
const $plotButton = document.querySelector(".plotButton");
const $inputText = document.querySelector(".inputText");
const $characterButton = document.querySelector(".characterButton");
const $happeningButton = document.querySelector(".happeningButton");
const $characterSector = document.querySelector(".characterSector");
const $characterContainer1 = document.querySelector(".characterContainer1");
const $characterContainer2 = document.querySelector(".characterContainer2");
const $happeningSector = document.querySelector(".happeningSector");
const $happeningContainer = document.querySelector(".happeningContainer");
const $modalContent = document.querySelector(".modalContent");
const $modalText = document.querySelector(".modalText");
const $modalButtons = document.querySelector(".modalButtons");
const $restartButton = document.querySelector(".restartButton");
const $continueButton = document.querySelector(".continueButton");
const $topButton = document.querySelector(".topButton");

// chatGPT API
const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사전 저장된 정보 (assistant의 역할)
const data = [
  {
    role: "system",
    content:
      "assistant는 다양한 장르에 대한 지식과 이해를 기반으로 보조 작가 역할을 수행하는 소설가이다.",
  },
];

// 입력 버튼 클릭 이벤트
$plotButton.addEventListener("click", (e) => {
  e.preventDefault();
  userInputTopic = $topicInput.value;
  $topicInput.value = "";
  userInputGenre = $genreInput.value;
  $genreInput.value = "";

  // 화면에 입력한 소재와 장르 표시
  const topicList = document.createElement("li");
  topicList.innerText = `소재: ${userInputTopic}`;
  const genreList = document.createElement("li");
  genreList.innerText = `장르: ${userInputGenre}`;
  $inputText.append(topicList, genreList);

  // data에 질문 추가
  data.push({
    role: "user",
    content: `소재: ${userInputTopic}, 장르: ${userInputGenre}의 소설 플롯 300자 내외로 작성해줘. 다음과 같은 형식으로 답변을 줘. 형식: '제목 : 작성한 제목\n설정 : 100자 이내의 작성한 내용의 배경 설정\n플롯 : 작성한 플롯 내용' `,
  });

  // modal을 띄우고 답변 표시
  openModal();
  loading($modalContent);

  chatGptAPI(data, (answer) => {
    $characterButton.removeAttribute("disabled");
    // 화면에 답변 표시
    const plotAnswer = document.createElement("li");
    plotAnswer.innerText = answer;
    $plotContainer.appendChild(plotAnswer);
    // 모달 텍스트 설정
    $modalText.style.display = "block";
    $modalText.textContent = answer;
    $modalButtons.style.display = "flex";
  });
});

// 등장인물 버튼 클릭 이벤트
$characterButton.addEventListener("click", (e) => {
  e.preventDefault();
  data.push({
    role: "user",
    content: `이 소설의 등장인물을 2명까지 세세하게 입체적으로 묘사해줘. 형식은 '등장인물1\n이름: 등장인물 이름\n등장인물 설명\n\n등장인물2\n이름: 등장인물 이름\n등장인물 설명\n' 으로 해줘`,
  });

  loading($characterSector);

  chatGptAPI(data, (answer) => {
    $happeningButton.removeAttribute("disabled");
    // 화면에 답변 표시
    const characterAnswer1 = document.createElement("li");
    characterAnswer1.innerText = answer.split("\n\n")[0];
    $characterContainer1.appendChild(characterAnswer1);

    const characterAnswer2 = document.createElement("li");
    characterAnswer2.innerText = answer.split("\n\n")[1];
    $characterContainer2.appendChild(characterAnswer2);
    console.log(answer);
  });
});

// 에피소드 버튼 클릭 이벤트
$happeningButton.addEventListener("click", (e) => {
  e.preventDefault();
  data.push({
    role: "user",
    content: `이 소설에서 벌어지는 주요한 에피소드 하나를 300자 이내로 작성해줘`,
  });

  loading($happeningContainer);

  chatGptAPI(data, (answer) => {
    // 화면에 답변 표시
    const happeningAnswer = document.createElement("li");
    happeningAnswer.innerText = answer;
    $happeningContainer.appendChild(happeningAnswer);
  });
});

// chatGPT API에게 질문에 대한 답 요청
function chatGptAPI(data, callback) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      const answer = res.choices[0].message.content;

      // 대화 데이터에 답변 추가
      data.push({
        role: "assistant",
        content: answer,
      });

      closeLoading();
      callback(answer);
    })
    .catch((error) => {
      console.error("Fetch 에러:", error);
      closeLoading();
      alert("데이터를 불러오는 데 실패했습니다");
    });
  // 실행 확인용 로그
  console.log("실행 확인");
}

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
// 이어가기 버튼 클릭 이벤트
$continueButton.addEventListener("click", function () {
  closeModal();
  $characterButton.focus();
  $characterButton.scrollIntoView({ behavior: "smooth" });
});

// 다시하기 버튼 클릭 이벤트
$restartButton.addEventListener("click", function () {
  clearAnswers($plotContainer, $modalText);
  closeModal();
});

// 직전 질문과 답변 제거
function clearAnswers(container1, container2) {
  // 답변 표시 지우기
  container1.innerHTML = "";
  container2.innerHTML = "";
  $modalButtons.style.display = "none";

  // data 배열에서 마지막 두 항목 제거하기
  data.splice(data.length - 2, 2);

  // 버튼 비활성화
  $characterButton.disabled = true;
  $happeningButton.disabled = true;
}

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
