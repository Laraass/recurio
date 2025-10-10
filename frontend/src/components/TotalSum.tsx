interface TotalSumProps {
  total?: number;
}

const TotalSum: React.FC<TotalSumProps> = ({ total = 0 }) => {
  return (
    <div className="flex flex-col p-6 bg-primary text-neutral-50 gap-2 rounded-xl max-w-md">
      <p className="text-xl font-medium">Total cost this month</p>
      <p className="text-5xl font-semibold">{total} kr</p>
    </div>
  );
};

export default TotalSum;
