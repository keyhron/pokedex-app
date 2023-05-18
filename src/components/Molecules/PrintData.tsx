import capitalize from "@/utils/capitalize";

const PrintData = ({
  title,
  array,
  itemData,
}: {
  title: string;
  array: any[];
  itemData: string;
}) => {
  return (
    <div className="mt-4">
      <h2 className="font-bold">{title}</h2>
      <ul>
        {array.map((item) => (
          <li key={item?.[itemData]?.url} className="list-inside list-disc">
            {capitalize(item?.[itemData]?.name)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrintData;
