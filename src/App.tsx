import React, { Component } from "react";

interface Param {
  id: number;
  name: string;
  type: string;
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

interface State {
  paramValues: { [key: number]: string };
}

class ParamEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const paramValues: { [key: number]: string } = {};
    props.params.forEach((param) => {
      const paramValue = props.model.paramValues.find(
        (pv) => pv.paramId === param.id
      );
      paramValues[param.id] = paramValue ? paramValue.value : "";
    });

    this.state = { paramValues };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  getModel = (): Model => {
    const { params } = this.props;
    const { paramValues } = this.state;

    const updatedParamValues: ParamValue[] = [];
    params.forEach((param) => {
      const value = paramValues[param.id] || "";
      updatedParamValues.push({ paramId: param.id, value });
    });

    return { paramValues: updatedParamValues };
  };

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;
    console.log(paramValues);

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={paramValues[param.id] || ""}
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

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

function App() {
  return (
    <div>
      <ParamEditor params={params} model={model} />
    </div>
  );
}

export default App;
