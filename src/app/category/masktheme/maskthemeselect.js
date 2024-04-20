// SpaceTypeSelector.js
import React, { useState } from 'react';
import masktheme from './masktheme';

const Maskthemeselect = () => {
  const [selectedMasktheme, setSelectedMaskthemee] = useState('');

  const handleSelectionChange = (e) => {
    setSelectedMasktheme(e.target.value);
  };

  return (
    <div>
      <label>
        인테리어 테마 선택:
        <select value={selectedMasktheme} onChange={handleSelectionChange}>
          <option value="">-- 선택하세요 --</option>
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
