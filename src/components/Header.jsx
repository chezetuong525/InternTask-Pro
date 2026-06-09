import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight text-gray-950">
        InternTask Pro
      </h1>

      <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#060617] text-white">
        <User size={19} />
      </button>
    </header>
  );
}
