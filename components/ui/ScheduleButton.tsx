"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";

interface ScheduleButtonProps {
  label: string;
}

export default function ScheduleButton({ label }: ScheduleButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <button
      data-cal-namespace="15min"
      data-cal-link="aasim-shah/15min"
      data-cal-config='{"layout":"month_view"}'
      className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-dark-gray-6 px-5 text-xs font-medium text-light-gray-3 transition-colors duration-300 hover:border-medium-gray hover:bg-very-dark-gray hover:text-white"
    >
      {label}
      <CalendarDays size={14} />
    </button>
  );
}
