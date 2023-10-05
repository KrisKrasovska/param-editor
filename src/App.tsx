import { useState, useEffect } from "react";

const params = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

function App() {
  return (
   const [paramValues, setParamValues] = useState<Map<number, string>>(
		new Map()
	 );
  
	 useEffect(() => {
		const initialValues = new Map<number, string>();
		params.forEach(param => {
		  const paramValue = model.paramValues.find(pv => pv.paramId === param.id);
		  initialValues.set(param.id, paramValue ? paramValue.value : '');
		});
		setParamValues(initialValues);
	 }, [params, model]);
  
	 // Обновляем значение параметра в состоянии при изменении ввода
	 const handleParamChange = (paramId: number, value: string) => {
		setParamValues(prevParamValues => {
		  const newParamValues = new Map(prevParamValues);
		  newParamValues.set(paramId, value);
		  return newParamValues;
		});
	 };
  
	 // Получаем полную структуру Model с обновленными значениями
	 const getModel = (): Model => {
		const updatedParamValues: ParamValue[] = [];
		params.forEach(param => {
		  const value = paramValues.get(param.id) || '';
		  updatedParamValues.push({ paramId: param.id, value });
		});
		return { paramValues: updatedParamValues };
	 };
  
	 return (
		<div>
		  {params.map(param => (
			 <div key={param.id}>
				<label>{param.name}:</label>
				<input
				  type="text"
				  value={paramValues.get(param.id) || ''}
				  onChange={e => handleParamChange(param.id, e.target.value)}
				/>
			 </div>
		  ))}
		</div>
	 );
  );
}

export default App;
