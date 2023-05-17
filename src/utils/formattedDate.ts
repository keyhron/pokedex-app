const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function formattedDate(): string {
  const today = new Date();
  const month = months[today.getMonth()];
  const day = today.getDate();
  const year = today.getFullYear();
  return `${day} de ${month}, ${year}`;
}

