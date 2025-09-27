// components/Calendar.jsx
"use client"; // this makes it a Client Component

import { useState } from "react";
import dynamic from "next/dynamic";

// dynamically import react-calendar (SSR-safe)
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });
import "react-calendar/dist/Calendar.css";

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="p-4">
      <Calendar onChange={setDate} value={date} />
      <p className="mt-2">Selected Date: {date.toDateString()}</p>
    </div>
  );
}
