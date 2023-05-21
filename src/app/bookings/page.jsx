"use client";
import Calendar from "@/components/Calendar";
import Schedule from "@/components/Schedule";
import "@/css/bookings.css";
import { useEffect } from "react";
const Page = () => {
  return (
    <>
      <section className="bookings-container">
        <section className="calendar-bg">
          <Calendar />
        </section>
        <section></section>
      </section>
    </>
  );
};

export default Page;
