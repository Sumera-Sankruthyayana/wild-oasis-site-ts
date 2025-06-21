import { getBooking } from "@/app/_lib/data-service";
import { Booking } from "@/app/_types/Booking";
import { updateReservation } from "@/app/_lib/actions";
import UpdateReservationButton from "@/app/_components/UpdateReservationButton";

export default async function Page({ params }: { params: { bookingid: string } }) {
    // CHANGE
    const reservationId = params.bookingid;
    const booking: Booking = await getBooking(reservationId);
    const maxCapacity = booking.cabins.max_capacity;
  
    return (
      <div>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Edit Reservation #{reservationId}
        </h2>
  
        <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
          <div className="space-y-2">
            <label htmlFor="num_guests">How many guests?</label>
            <select
              name="num_guests"
              id="num_guests"
              defaultValue={booking.num_guests}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
  
          <div className="space-y-2">
            <label htmlFor="observation">
              Anything we should know about your stay?
            </label>
            <textarea
              name="observation"
              defaultValue={booking.observation}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>

          <input type="hidden" name="bookingid" value={booking.id} />
  
          <div className="flex justify-end items-center gap-6">
            <UpdateReservationButton />
          </div>
        </form>
      </div>
    );
  }

  