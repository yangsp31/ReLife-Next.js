import React, { useState } from 'react'; //useState:상태관리에 필요
import masktheme from './masktheme';

const Maskthemeselect = () => { //함수형 컴포넌트 정의
  //상태변수(selectedMasktheme선언),초기값: 빈문자열
  //setSelectedMaskthemee: useState훅을 통해 생성, selectedMasktheme 상태 변수를 업데이트
  const [selectedMasktheme, setSelectedMaskthemee] = useState(''); 

  //선택된 값이 변경될때마다 호출
  const handleSelectionChange = (e) => {
    //e.target.value선택된 값 얻음, setSelectedMasktheme: 선택된 값 상태변수에 저장 
    setSelectedMasktheme(e.target.value);

  };

  return (
    <div>
      <label>
        인테리어 테마 선택:
        {/*value 속성을 selectedMasktheme로 지정, 선택 변경 시 handleSelectionChange가 호출*/}
        <select value={selectedMasktheme} onChange={handleSelectionChange}>      
          <option value="">-- 선택하세요 --</option>

          {/*masktheme 객체의 각 항목을 Object.entries로 순회하여 생성*/}
          {Object.entries(Masktheme).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </label>
      <p>선택된 인테리어 테마: {Masktheme[selectedMasktheme]}</p>
    </div>
  );
};

export default Maskthemeselect;
