import CabinCard from "@/app/_components/CabinCard";
import { Cabin } from "../_types/Cabin";
import { getCabins } from "../_lib/data-service";
export default async function CabinList({ filter }: { filter: string }) {
  const cabins: Cabin[] = await getCabins();
  let displayCabins = cabins;
  if (filter === "all") {
    displayCabins = cabins;
  }
  if (filter === "small") {
    displayCabins = cabins.filter((cabin) => cabin.max_capacity <= 2);
  }
  if (filter === "medium") {
    displayCabins = cabins.filter(
      (cabin) => cabin.max_capacity >= 3 && cabin.max_capacity <= 6
    );
  }
  if (filter === "large") {
    displayCabins = cabins.filter((cabin) => cabin.max_capacity >= 7);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
