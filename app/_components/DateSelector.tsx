"use client";
import { differenceInDays, isPast, isSameDay, isWithinInterval } from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { Cabin } from "@/app/_types/Cabin";
import { useReservation } from "./ReservationContext";
import { DateRange } from "react-day-picker";

function isAlreadyBooked(range: DateRange | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date: Date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

function DateSelector({
  bookedDates,
  cabin,
}: {
  bookedDates: Date[];
  cabin: Cabin;
}) {
  // CHANGE

  const {regular_price, discount} = cabin;

  // SETTINGS
  const minBookingLength = 1;
  const maxBookingLength = 23;
  const defaultClassNames = getDefaultClassNames();
  const { range, setRange, resetRange } = useReservation();
  //const displayRange = isAlreadyBooked(range, bookedDates) ? range : {from: undefined, to: undefined};
  const numNights = range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * (regular_price - discount);


  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        classNames={{
          today: `border-amber-500`, // Add a border to today's date
          selected: `bg-amber-500 border-amber-500 text-white`, // Highlight the selected day
          root: `${defaultClassNames.root} shadow-lg p-5`, // Add a shadow to the root element
          chevron: `${defaultClassNames.chevron} fill-amber-500`, // Change the color of the chevron
          months: `${defaultClassNames.months} flex flex-row gap-1`,
        }}
        selected={range}
        onSelect={setRange}
        mode="range"
        required
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) => isPast(curDate) || bookedDates.some((date) => isSameDay(date, curDate))}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
