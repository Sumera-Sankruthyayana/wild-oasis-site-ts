import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId } from "@/app/_lib/data-service";
import { Cabin } from "@/app/_types/Cabin";
import LoginMessage from "./LoginMessage";
import { auth } from "../_lib/auth";

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  //const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);
  const session = await auth();
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} session={session} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
