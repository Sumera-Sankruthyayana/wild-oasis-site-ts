"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleClick(capacity: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", capacity);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => handleClick("small")}>1&mdash;2</Button>
      <Button onClick={() => handleClick("medium")}>3&mdash;6</Button>
      <Button onClick={() => handleClick("large")}>7&mdash;10</Button>
      <Button onClick={() => handleClick("all")}>All</Button>
    </div>
  );
}
function Button({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-primary-800 text-primary-50 px-4 py-2 rounded-md hover:bg-primary-700 transition-all"
    >
      {children}
    </button>
  );
}
