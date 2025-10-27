import { useEffect, useState } from "react";

interface TotalSumProps {
  total?: number;
}

const TotalSum: React.FC<TotalSumProps> = () => {

  const [total, setTotal] = useState(0);

  useEffect(() => {


    
  }, []);

  return (
    <div className="flex flex-col p-6 bg-primary text-neutral-50 gap-2 rounded-xl max-w-md">
      <p className="text-xl font-medium">Total cost this month</p>
      <p className="text-5xl font-semibold">{total} kr</p>
    </div>
  );
};

export default TotalSum;
