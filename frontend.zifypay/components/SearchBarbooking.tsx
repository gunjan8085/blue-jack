import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, ChevronDown, Navigation } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return;
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target)) {
        setShowTimeSelector(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setLocation('Current Location');
          setIsGettingLocation(false);
          setShowLocationDropdown(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Location unavailable');
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocation('Location not supported');
      setIsGettingLocation(false);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push({ value: time, display: displayTime });
      }
    }
    return slots;
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.append('query', searchQuery);
    if (location) params.append('location', location);
    if (selectedDate) params.append('date', selectedDate);
    if (selectedTime) params.append('time', selectedTime);
    
    // In a real app, you'd use React Router or Next.js router
    const queryString = params.toString();
    window.location.href = `/businesses${queryString ? '?' + queryString : ''}`;
  };

  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      {/* Search Bar Container */}
      <div className="bg-white rounded-2xl sm:rounded-full shadow-lg p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 relative">
        {/* Main Search Input */}
        <div className="flex-1 flex items-center px-4 py-3 min-w-0">
          <Search className="text-gray-400 h-5 w-5 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="All treatments and venues"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-sm font-medium min-w-0"
          />
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

        {/* Mobile divider */}
        <div className="block sm:hidden h-px w-full bg-gray-200 mx-4"></div>

        {/* Location Filter */}
        <div className="relative flex-1 sm:flex-initial" ref={locationRef}>
          <div 
            className="flex items-center px-4 py-3 min-w-0 cursor-pointer"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <MapPin className="text-gray-400 h-4 w-4 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-sm font-medium min-w-0"
            />
            <ChevronDown className="text-gray-400 h-4 w-4 ml-2 flex-shrink-0" />
          </div>
          
          {showLocationDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50">
              <div className="p-2">
                <button
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {isGettingLocation ? 'Getting location...' : 'Use current location'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

        {/* Mobile divider */}
        <div className="block sm:hidden h-px w-full bg-gray-200 mx-4"></div>

        {/* Date and Time Container - Side by side on mobile */}
        <div className="flex flex-1 sm:flex-initial gap-2 sm:gap-0">
          {/* Date Filter */}
          <div className="relative flex-1 sm:flex-initial" ref={calendarRef}>
            <div 
              className="flex items-center px-4 py-3 min-w-0 cursor-pointer"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <Calendar className="text-gray-400 h-4 w-4 mr-3 flex-shrink-0" />
              <span className="text-gray-700 text-sm font-medium min-w-0 truncate">
                {selectedDate ? formatDate(new Date(selectedDate)) : 'Any date'}
              </span>
              <ChevronDown className="text-gray-400 h-4 w-4 ml-2 flex-shrink-0" />
            </div>
            
            {showCalendar && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border z-50 p-4 w-80 max-w-[90vw]">
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-medium text-gray-400 py-2">{day}</div>
                  ))}
                  {generateCalendarDays().map((date, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(date.toISOString().split('T')[0]);
                        setShowCalendar(false);
                      }}
                      className={`py-2 rounded-md hover:bg-blue-100 ${
                        selectedDate === date.toISOString().split('T')[0] 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-700'
                      }`}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile divider between date and time */}
          <div className="block sm:hidden w-px bg-gray-200 self-stretch my-2"></div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

          {/* Time Filter */}
          <div className="relative flex-1 sm:flex-initial" ref={timeRef}>
            <div 
              className="flex items-center px-4 py-3 min-w-0 cursor-pointer"
              onClick={() => setShowTimeSelector(!showTimeSelector)}
            >
              <Clock className="text-gray-400 h-4 w-4 mr-3 flex-shrink-0" />
              <span className="text-gray-700 text-sm font-medium min-w-0 truncate">
                {selectedTime ? generateTimeSlots().find(slot => slot.value === selectedTime)?.display : 'Any time'}
              </span>
              <ChevronDown className="text-gray-400 h-4 w-4 ml-2 flex-shrink-0" />
            </div>
            
            {showTimeSelector && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border z-50 w-48 max-h-60 overflow-y-auto">
                <div className="p-2">
                  {generateTimeSlots().map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => {
                        setSelectedTime(slot.value);
                        setShowTimeSelector(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                        selectedTime === slot.value ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {slot.display}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile divider */}
        <div className="block sm:hidden h-px w-full bg-gray-200 mx-4"></div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0 w-full sm:w-auto"
        >
          <span className="text-sm font-medium">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;