//설명변경필요
const masktheme = [
  { value: 'DT-INT-001', name: '보헤미안', description: '자유롭고 예술적인 분위기를 중시하는 보헤미안 스타일.' },
  { value: 'DT-INT-002', name: '해안가', description: '밝고 통풍이 잘 되는 해안가 스타일.' },
  { value: 'DT-INT-003', name: '현대', description: '깔끔하고 세련된 현대 스타일.' },
  { value: 'DT-INT-004', name: '농가', description: '따뜻하고 전통적인 농가 스타일.' },
  { value: 'DT-INT-005', name: '프랑스국가', description: '우아하고 고급스러운 프랑스 국가 스타일.' },
  { value: 'DT-INT-006', name: '글램', description: '화려하고 눈에 띄는 글램 스타일.' },
  { value: 'DT-INT-007', name: '산업용', description: '거친 마감과 노출된 재료를 사용하는 산업용 스타일.' },
  { value: 'DT-INT-008', name: '재팬디', description: '일본식 간소함과 북유럽식 따뜻함을 결합한 재팬디 스타일.' },
  { value: 'DT-INT-009', name: '미드센추리모던', description: '20세기 중반의 디자인 특징을 담은 미드센추리 모던 스타일.' },
  { value: 'DT-INT-010', name: '미니멀', description: '최소한의 장식과 기능성을 중시하는 미니멀 스타일.' },
  { value: 'DT-INT-011', name: '모던', description: '현대적인 감각과 디자인 요소를 포함한 모던 스타일.' },
  { value: 'DT-INT-012', name: '러스틱', description: '자연스러움과 소박함을 강조한 러스틱 스타일.' },
  { value: 'DT-INT-013', name: '스칸디나비아', description: '북유럽 특유의 단순하고 기능적인 스칸디나비아 스타일.' },
  { value: 'DT-INT-014', name: '전통', description: '전통적인 요소와 디자인을 중시하는 스타일.' },
  { value: 'DT-INT-015', name: '과도기', description: '전통과 현대를 결합한 과도기적 스타일.' }
];


//이미지 번호에 따른 테마 정의
const themeRanges = {
  '보헤미안': [1, 4],
  '해안가': [5, 8],
  '현대': [9, 12],
  '농가': [13, 16],
  '프랑스국가': [17, 20],
  '글램': [21, 24],
  '산업용': [25, 28],
  '재팬디': [29, 32],
  '미드센추리모던': [33, 36],
  '미니멀': [37, 40],
  '모던': [41, 44],
  '러스틱': [45, 48],
  '스칸디나비아': [49, 52],
  '전통': [53, 56],
  '과도기': [57, 60]
};

export { masktheme, themeRanges };
