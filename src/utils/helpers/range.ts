export function appointmentDuration(from: number, to: number) {
  const from_label = from < 12 && from > 8 ? `${from} AM` : `${from} PM`;
  const to_label = from < 12 && from > 8 ? `${to} AM` : `${to} PM`;

  return `${from_label} - ${to_label}`;
}
