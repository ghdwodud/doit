type TagProps = {
  label: string;
  type: "todo" | "done";
};

export default function Tag({ label, type }: TagProps) {
  const styles = {
    todo: "bg-lime-200 text-green-900",
    done: "bg-green-600 text-white",
  };

  return (
    <span
      className={`text-xs font-bold px-4 py-1 rounded-full ${styles[type]}`}
    >
      {label.toUpperCase()}
    </span>
  );
}
