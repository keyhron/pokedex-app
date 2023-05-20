import capitalize from "@/utils/capitalize";

const PrintData = ({
  "data-cy": dataCy,
  title,
  array,
  itemData,
}: {
  "data-cy"?: string;
  title: string;
  array: any[];
  itemData: string;
}) => {
  return (
    <div className="mt-4" data-cy={dataCy}>
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

