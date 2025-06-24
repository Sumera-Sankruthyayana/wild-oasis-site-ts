"use client";
import { Cabin } from "@/app/_types/Cabin";
import { useReservation } from "./ReservationContext";
import { Session } from "next-auth";
import { differenceInDays } from "date-fns";
import { createReservation } from "@/app/_lib/actions";
import { ReservationData } from "@/app/_types/ReservationData";
import CreateReservationButton from "./CreateReservationButton";
function ReservationForm({
  cabin,
  session,
}: {
  cabin: Cabin;
  session: Session;
}) {
  // CHANGE
  const { max_capacity, regular_price, discount, id } = cabin;
  const { range, resetRange } = useReservation();
  const numNights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regular_price - discount);
  const reservationData: ReservationData = {
    cabin_id: id,
    start_date: range?.from,
    end_date: range?.to,
    cabin_price: cabinPrice,
    num_nights: numNights,
  }
  const createReservationWithData = createReservation.bind(null, reservationData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={session.user?.image || ""}
            alt={session.user?.name || ""}
          />
          <p>{session.user?.name}</p>
        </div>
      </div>
      <form action={(formData: FormData)=>{
        createReservationWithData(formData);
        resetRange();
      }} className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="num_guests"
            id="num_guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: max_capacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observation"
            id="observation"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {range?.from && range?.to ? (
            <CreateReservationButton />
          ) : (
            <p className="text-primary-300 text-base">Start by selecting dates</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
