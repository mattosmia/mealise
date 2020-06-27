import React, {useState} from 'react';
import { CirclePicker,SketchPicker } from 'react-color';

import './Meals.scss';

export default function Meals() {
  const [colour, setColour] = useState('#f44336');
  const handleChange = colour => setColour(colour);

  return (
    <section className="meals">
      <h1>Meals</h1>
      <label>
        <span>Meal name</span>
        <input type="text" name="meal_name" />
      </label>
      <p className="label">
        <span>Colour label</span>
      </p>
      <CirclePicker color={colour} onChangeComplete={handleChange} />
      <button>Add meal</button>
    </section>
  )
}