
// 이미지 목록을 섞는 함수, 입력된 배열을 변경하지 않고, 새로운 배열을 반환
export function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


// 빈도수 계산 및 결과 반환 함수,선택된 이미지 ID 배열과 전체 이미지 배열을 받음
export function calculateResult(selectedIds, images) {
  const frequencytheme = {}; // 빈도수를 저장할 객체, 키: 스타일 이름, 값: 해당 스타일의 빈도수

    // 선택된 이미지 ID 배열을 순회하며 빈도수를 계산
  selectedIds.forEach((id) => {
    const image = images.find((img) => img.path === id); // 각 ID에 해당하는 이미지 객체를 찾음 
    if (image) {
      const style = image.theme; //이미지 테마 가져옴 
      frequencytheme[style] = (frequencytheme[style] || 0) + 1; // 해당 스타일의 빈도수를 증가
    }
  });

  const maxCount = Math.max(...Object.values(frequencytheme)); // 최빈값 찾음

    // 가장 높은 빈도수를 가진 스타일을 찾아 배열로 반환
  const mostPreferredStyles = Object.keys(frequencytheme).filter(
    (style) => frequencytheme[style] === maxCount
  );
  
  // 이미지 배열을 순회하여 스타일 설명을 객체로 만듦. 키는 스타일 이름, 값은 스타일 설명.
  const styleDescriptions = images.reduce((acc, img) => {
    acc[img.theme] = img.themeDescription;
    return acc;
  }, {}); // 스타일 설명을 가져옴(acc)

  // 가장 선호하는 스타일의 설명을 배열로 만듦
  const resultDescriptions = mostPreferredStyles.map(
    (style) => styleDescriptions[style]
  );

  // 최종 결과를 스타일과 설명이 매핑된 객체 배열로 만듦
  const resulttheme = mostPreferredStyles.map((style, index) => ({
    [style]: resultDescriptions[index], //  // 스타일을 키로, 설명을 값으로 최종 결과 매핑
  }));

  return resulttheme; // 최종 결과를 반환
};