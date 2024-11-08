import { useState } from 'react';

const ChecklistForm = () => {
  const [checkedItems, setCheckedItems] = useState({
    elektronik: false,
    tv: false,
    laptop: false,
    kulkas: false,
  });

  // Handle parent checkbox (elektronik)
  const handleParentChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedItems({
      elektronik: isChecked,
      tv: isChecked,
      laptop: isChecked,
      kulkas: isChecked,
    });
  };

  // Handle individual child checkboxes
  const handleChildChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checkedItems.elektronik}
          onChange={handleParentChange}
        />
        Elektronik
      </label>
      <div style={{ paddingLeft: '20px' }}>
        <label>
          <input
            type="checkbox"
            name="tv"
            checked={checkedItems.tv}
            onChange={handleChildChange}
          />
          TV
        </label>
        <label>
          <input
            type="checkbox"
            name="laptop"
            checked={checkedItems.laptop}
            onChange={handleChildChange}
          />
          Laptop
        </label>
        <label>
          <input
            type="checkbox"
            name="kulkas"
            checked={checkedItems.kulkas}
            onChange={handleChildChange}
          />
          Kulkas
        </label>
      </div>
    </div>
  );
};

export default ChecklistForm;
