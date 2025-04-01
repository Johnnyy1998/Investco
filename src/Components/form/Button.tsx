import { useFormStatus } from "react-dom";

function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-grow rounded-xl shadow-md bg-sky-100 "
    >
      {pending ? "submiting" : text}
    </button>
  );
}

export default Button;
