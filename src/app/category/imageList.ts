import { masktheme, themeRanges } from './masktheme/masktheme'; // masktheme 및themeRanges를 masktheme 모듈에서 가져옴

// 이미지 ID로 테마를 가져오는 함수
function getThemeByImageId(id) {
  // themeRanges 객체의 각 테마에 대해 반복
  for (const theme in themeRanges) {
    // 현재 테마의 이미지 ID 범위를 가져옴
    const [start, end] = themeRanges[theme];
    // 주어진 ID가 현재 테마의 범위 내에 있는지 확인
    if (id >= start && id <= end) {
      // themeRanges에서 찾은 테마 이름에 해당하는 객체를 masktheme 배열에서 찾음
      const themeObject = masktheme.find(t => t.name === theme);
      // 테마 객체가 존재하면 반환, 그렇지 않으면 null 반환
      return themeObject ? themeObject : null;
    }
  }
  // 어떤 테마에도 속하지 않는 경우 null 반환
  return null;
}

// 이미지 리스트를 저장할 배열 선언
const imageList = [];
// 1부터 60까지의 숫자에 대해 반복
for (let i = 1; i <= 60; i++) {
  // 현재 이미지 ID에 해당하는 테마를 가져옴
  const theme = getThemeByImageId(i);
  // 이미지 객체를 생성하여 imageList 배열에 추가
  imageList.push({
    id: i, // 이미지 ID
    path: `/style/${i}.jpg`, // 이미지 경로
    description: `Description of image ${i}`, // 이미지 설명
    tags: [`tag${i}`], // 이미지 태그
    theme: theme ? theme.name : null, // 테마 이름 (있으면)
    themeDescription: theme ? theme.description : null // 테마 설명 (있으면)
  });
}

// imageList 배열을 기본으로 내보냄
export default imageList;
