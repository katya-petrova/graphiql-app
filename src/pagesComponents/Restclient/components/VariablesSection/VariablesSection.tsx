import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Variable = {
  key: string;
  value: string;
};

type VariablesSectionProps = {
  variables: Variable[];
  setVariables: (variables: Variable[]) => void;
  updateBodyWithVariables: (variables: Variable[]) => void;
};

const VariablesSection: React.FC<VariablesSectionProps> = ({
  variables,
  setVariables,
  updateBodyWithVariables,
}) => {
  const handleVariableChange = (index: number, key: string, value: string) => {
    const updatedVariables = [...variables];
    updatedVariables[index] = { key, value };
    setVariables(updatedVariables);
    updateBodyWithVariables(updatedVariables);
  };

  const addVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeVariable = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
    updateBodyWithVariables(updatedVariables);
  };

  return (
    <Accordion
      sx={{
        borderRadius: '0.25rem',
        overflow: 'hidden',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="variables-content"
        id="variables-header"
      >
        Variables
      </AccordionSummary>
      <AccordionDetails>
        <div className="space-y-4">
          {variables.map((variable, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="text"
                placeholder="Key"
                value={variable.key}
                onChange={(e) =>
                  handleVariableChange(index, e.target.value, variable.value)
                }
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <input
                type="text"
                placeholder="Value"
                value={variable.value}
                onChange={(e) =>
                  handleVariableChange(index, variable.key, e.target.value)
                }
                className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none"
              />
              <button
                onClick={() => removeVariable(index)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addVariable}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add Variable
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default VariablesSection;
