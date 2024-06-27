type LabelProps = {
  label: string;
};

function Label({ label }: LabelProps) {
  return (
    <div className="bg-gradient-to-r from-lightPink to-invert px-3 py-2 rounded-full w-fit">
      <p className="text-pink font-medium">{label}</p>
    </div>
  );
}

export { Label };
