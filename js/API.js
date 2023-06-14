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
      // 모달 텍스트 설정
      $modalText.style.display = "block";
      $modalText.textContent = answer;
      $modalButtons.style.display = "flex";
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
