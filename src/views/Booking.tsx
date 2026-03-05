"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  X,
  Info
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  date: Date | null;
  time: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
}

const services = [
  { value: '', label: 'Select a Service' },
  { value: 'wedding', label: 'Wedding Photography' },
  { value: 'portrait', label: 'Portrait Photography' },
  { value: 'event', label: 'Event Photography' },
  { value: 'fashion', label: 'Fashion Photography' },
  { value: 'commercial', label: 'Commercial Photography' },
  { value: 'family', label: 'Family & Baby Photography' },
  { value: 'consultation', label: 'Free Consultation' },
];

// Generate time slots for a day
const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 19; // 7 PM

  // Simulate some booked slots based on date
  const day = date.getDate();
  const bookedIndices = [(day * 3) % 12, (day * 5) % 12, (day * 7) % 12];

  for (let hour = startHour; hour < endHour; hour++) {
    const time1 = `${hour}:00`;
    const time2 = `${hour}:30`;

    slots.push({
      time: time1,
      available: !bookedIndices.includes((hour - startHour) * 2)
    });
    slots.push({
      time: time2,
      available: !bookedIndices.includes((hour - startHour) * 2 + 1)
    });
  }

  return slots;
};

// Generate calendar days
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: (number | null)[] = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Booking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    time: '',
    name: '',
    email: '',
    phone: '',
    service: '',
    notes: ''
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = generateCalendarDays(year, month);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      ScrollTrigger.create({
        trigger: calendarRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            calendarRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate));
      setSelectedTime('');
    }
  }, [selectedDate]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected >= today) {
      setSelectedDate(selected);
      setBookingData({ ...bookingData, date: selected });
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingData({ ...bookingData, time });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmation(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooked(true);
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="relative w-full bg-forest-dark min-h-[100dvh] pt-32 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <p className="text-white/50 text-sm font-body uppercase tracking-widest mb-4">
          Book a Session
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight mb-6">
          Online <span className="font-serif italic font-normal text-white/80">Booking</span>
        </h1>
        <p className="text-white/60 font-body text-lg max-w-2xl">
          Select your preferred date and time, and we'll confirm your booking within 24 hours.
        </p>
      </div>

      {/* Booking Section */}
      <div ref={calendarRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showConfirmation ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-forest-mid/50 rounded-2xl p-6 sm:p-8 border border-white/10">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-sans font-semibold text-white">
                  {monthNames[month]} {year}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-white/40 text-sm font-body py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day !== null && (
                      <button
                        onClick={() => handleDateSelect(day)}
                        disabled={isDateDisabled(day)}
                        className={`w-full h-full rounded-lg flex items-center justify-center text-sm font-body transition-all duration-300 ${selectedDate?.getDate() === day &&
                            selectedDate?.getMonth() === month &&
                            selectedDate?.getFullYear() === year
                            ? 'bg-[#c4a35a] text-forest-dark font-semibold'
                            : isDateDisabled(day)
                              ? 'text-white/20 cursor-not-allowed'
                              : 'text-white hover:bg-white/10'
                          }`}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-[#c4a35a]" />
                  <span className="text-white/60 text-sm font-body">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white/10" />
                  <span className="text-white/60 text-sm font-body">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white/5" />
                  <span className="text-white/40 text-sm font-body">Unavailable</span>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-forest-mid/50 rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#c4a35a]" />
                <h2 className="text-xl font-sans font-semibold text-white">
                  Select Time
                </h2>
              </div>

              {selectedDate ? (
                <>
                  <p className="text-white/60 font-body mb-4">
                    Available slots for{' '}
                    <span className="text-white font-semibold">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`py-3 px-2 rounded-lg text-sm font-body transition-all duration-300 ${selectedTime === slot.time
                            ? 'bg-[#c4a35a] text-forest-dark font-semibold'
                            : slot.available
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-red-500/20 text-red-400 cursor-not-allowed relative overflow-hidden'
                          }`}
                      >
                        {slot.time}
                        {!slot.available && (
                          <span className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                            <X className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50 font-body">
                    Please select a date first to view available time slots
                  </p>
                </div>
              )}

              {/* Selected Summary */}
              {selectedDate && selectedTime && (
                <div className="mt-8 p-4 bg-[#c4a35a]/10 rounded-xl border border-[#c4a35a]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5 text-[#c4a35a]" />
                    <span className="text-white font-sans font-semibold">Your Selection</span>
                  </div>
                  <p className="text-white/70 font-body">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })} at {selectedTime}
                  </p>
                  <button
                    onClick={handleContinue}
                    className="w-full mt-4 py-3 bg-[#c4a35a] text-forest-dark font-sans font-semibold rounded-lg hover:bg-[#c4a35a]/90 transition-colors"
                  >
                    Continue to Details
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : !isBooked ? (
          /* Confirmation Form */
          <div className="max-w-2xl mx-auto bg-forest-mid/50 rounded-2xl p-6 sm:p-8 border border-white/10">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex items-center gap-2 text-white/60 hover:text-white font-body mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Calendar
            </button>

            <h2 className="text-2xl font-sans font-semibold text-white mb-2">
              Complete Your Booking
            </h2>
            <p className="text-white/60 font-body mb-6">
              {selectedDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })} at {selectedTime}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-body mb-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-body mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-body mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors"
                    placeholder="+94 77 123 4567"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white/70 text-sm font-body mb-2">
                    <CalendarIcon className="w-4 h-4" />
                    Service *
                  </label>
                  <select
                    name="service"
                    value={bookingData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body focus:outline-none focus:border-[#c4a35a] transition-colors appearance-none cursor-pointer"
                  >
                    {services.map((service) => (
                      <option key={service.value} value={service.value} className="bg-forest-dark">
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm font-body mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-forest-dark border border-white/20 rounded-lg text-white font-body placeholder:text-white/30 focus:outline-none focus:border-[#c4a35a] transition-colors resize-none"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#c4a35a] text-forest-dark font-sans font-semibold rounded-lg hover:bg-[#c4a35a]/90 transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Confirm Booking
              </button>
            </form>
          </div>
        ) : (
          /* Success Message */
          <div className="max-w-2xl mx-auto bg-forest-mid/50 rounded-2xl p-6 sm:p-8 border border-white/10 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-sans font-bold text-white mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-white/60 font-body mb-6">
              Thank you for booking with Lumina Photography Studio. We've sent a confirmation
              email to <span className="text-white">{bookingData.email}</span>. Our team will
              contact you within 24 hours to finalize the details.
            </p>
            <div className="bg-forest-dark/50 rounded-xl p-6 mb-6">
              <p className="text-white/50 text-sm font-body mb-2">Booking Summary</p>
              <p className="text-white font-sans font-semibold text-lg">
                {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-[#c4a35a] font-body">{selectedTime}</p>
              <p className="text-white/70 font-body mt-2">
                {services.find(s => s.value === bookingData.service)?.label}
              </p>
            </div>
            <button
              onClick={() => {
                setIsBooked(false);
                setShowConfirmation(false);
                setSelectedDate(null);
                setSelectedTime('');
                setBookingData({
                  date: null,
                  time: '',
                  name: '',
                  email: '',
                  phone: '',
                  service: '',
                  notes: ''
                });
              }}
              className="px-8 py-3 bg-white/10 text-white font-body rounded-full hover:bg-white/20 transition-colors"
            >
              Book Another Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
