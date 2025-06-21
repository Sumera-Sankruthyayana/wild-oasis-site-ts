import ReservationCard from "@/app/_components/ReservationCard";
import { Booking } from "@/app/_types/Booking";
import { Metadata } from "@/app/_types/Metadata";
import { getBookings } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservations",
};

export default async function Page() {
  // CHANGE
  const session = await auth();
  const bookings: Booking[] = await getBookings(session?.user?.id ?? "");

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking: Booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
