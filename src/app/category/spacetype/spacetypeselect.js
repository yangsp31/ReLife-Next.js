import React, { useState } from 'react';
import spaceTypes from './spaceTypes';

const SpaceTypeSelector = () => {
  const [selectedSpaceType, setSelectedSpaceType] = useState('');

  const handleSelectionChange = (e) => {
    setSelectedSpaceType(e.target.value);
  };

  return (
    <div>
      <label>
        공간 유형 선택:
        <select value={selectedSpaceType} onChange={handleSelectionChange}>
          <option value="">-- 선택하세요 --</option>
          {Object.entries(spaceTypes).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </label>
      <p>선택된 공간 유형: {spaceTypes[selectedSpaceType]}</p>
    </div>
  );
};

export default SpaceTypeSelector;
