export interface IExpensiveCalculationComponentProps {
  value: number;
}

export const ExpensiveCalculationComponent: React.FC<IExpensiveCalculationComponentProps> = ({
  value,
}) => {
  console.log(`Running Expensive Calculation for ${value}`);

  let result = 0;

  for (let i = 0; i < 1_000_000_000; i++) {
    result += i * value;
  }

  return <output>{`Calculated value is ${result}`}</output>;
};

export default ExpensiveCalculationComponent;
