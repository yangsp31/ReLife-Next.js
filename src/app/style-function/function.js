
// 이미지 목록을 섞는 함수
export function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


// 빈도수 계산 및 결과 반환 함수
export function calculateResult(selectedIds, images) {
  const frequencytheme = {}; // 빈도수를 저장할 객체

  selectedIds.forEach((id) => {
    const image = images.find((img) => img.path === id);
    if (image) {
      const style = image.theme;
      frequencytheme[style] = (frequencytheme[style] || 0) + 1; // 빈도수 계산
    }
  });

  const maxCount = Math.max(...Object.values(frequencytheme)); // 최빈값 계산

  const mostPreferredStyles = Object.keys(frequencytheme).filter(
    (style) => frequencytheme[style] === maxCount
  );

  const styleDescriptions = images.reduce((acc, img) => {
    acc[img.theme] = img.themeDescription;
    return acc;
  }, {}); // 스타일 설명을 가져옴

  const resultDescriptions = mostPreferredStyles.map(
    (style) => styleDescriptions[style]
  );

  const resulttheme = mostPreferredStyles.map((style, index) => ({
    [style]: resultDescriptions[index], // 최종 결과 매핑
  }));

  return resulttheme; // 최종 결과를 반환
};