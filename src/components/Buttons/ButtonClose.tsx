import { TrashIcon } from "@heroicons/react/16/solid";

function ButtonClose({
  handleClose,
  className,
}: {
  handleClose: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <button onClick={handleClose} className="rounded-full bg-white p-1">
        <TrashIcon className="h-6 w-6 text-black" />
      </button>
    </div>
  );
}

export { ButtonClose };
