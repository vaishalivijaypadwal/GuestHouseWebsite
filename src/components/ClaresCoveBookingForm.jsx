import React, { useState } from 'react';
import emailjs from '@emailjs/browser';


const ClaresCoveBookingForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    roomType: 'standard',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showWhatsAppOption, setShowWhatsAppOption] = useState(false);

  // WhatsApp number (with country code for India)
  const whatsappNumber = "917219236054"; // 91 is India country code

  // Room options without prices
  const roomTypes = [
    { id: 'standard', name: 'Standard Room' },
    { id: 'deluxe', name: 'Deluxe Sea View' },
    { id: 'suite', name: 'Beachfront Suite' },
    { id: 'family', name: 'Family Villa' }
  ];

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  };

  const nights = calculateNights();
  const selectedRoom = roomTypes.find(room => room.id === formData.roomType);

  // Helper functions to get dates in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle number input changes with validation
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    // Validation for adults and children
    if (name === 'adults') {
      if (numValue < 1) {
        setErrors(prev => ({ ...prev, adults: 'At least 1 adult required' }));
        return;
      }
      if (numValue > 8) {
        setErrors(prev => ({ ...prev, adults: 'Maximum 8 adults per booking' }));
        return;
      }
    }
    
    if (name === 'children') {
      if (numValue < 0) {
        setErrors(prev => ({ ...prev, children: 'Cannot be negative' }));
        return;
      }
      if (numValue > 6) {
        setErrors(prev => ({ ...prev, children: 'Maximum 6 children per booking' }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: numValue
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone number validation (basic)
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Date validation
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date(getTodayDate());
      
      if (checkInDate < today) {
        newErrors.checkIn = 'Check-in date cannot be in the past';
      }
      
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
      
      if (nights > 30) {
        newErrors.checkOut = 'Maximum stay is 30 nights';
      }
    }
    
    // Room capacity validation
    const totalGuests = formData.adults + formData.children;
    const roomCapacities = {
      'standard': 2,
      'deluxe': 3,
      'suite': 3,
      'family': 6
    };
    
    if (totalGuests > roomCapacities[formData.roomType]) {
      newErrors.roomType = `Selected room accommodates maximum ${roomCapacities[formData.roomType]} guests`;
    }
    
    return newErrors;
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      roomType: 'standard',
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setShowWhatsAppOption(false);
  };

  // Function to open WhatsApp chat with booking details
  const openWhatsAppChat = () => {
    // Format the message for WhatsApp (without prices)
    const whatsappMessage = encodeURIComponent(
      `*NEW BOOKING INQUIRY - Clares Cove Guest House*\n\n` +
      `👤 *Guest Details:*\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n\n` +
      `🏨 *Booking Details:*\n` +
      `• Room Type: ${selectedRoom?.name}\n` +
      `• Check-in: ${formData.checkIn}\n` +
      `• Check-out: ${formData.checkOut}\n` +
      `• Nights: ${nights}\n` +
      `• Adults: ${formData.adults}\n` +
      `• Children: ${formData.children}\n\n` +
      `💬 *Special Requests:*\n` +
      `${formData.specialRequests || 'None'}\n\n` +
      `📅 Submitted: ${new Date().toLocaleString()}\n` +
      `📱 Sent via Website Booking Form`
    );
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
  };

  // Send email function
  const sendEmailNotification = async () => {
    setIsSendingEmail(true);
    
    try {
      // Initialize EmailJS with your Public Key
      const serviceID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
      const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
      const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

      const templateParams = {
        to_email: 'vaishalipadwal29121999@gmail.com',
        from_name: 'Clares Cove Booking System',
        guest_name: formData.name,
        guest_email: formData.email,
        guest_phone: formData.phone,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        room_type: selectedRoom?.name,
        adults: formData.adults,
        children: formData.children,
        nights: nights,
        special_requests: formData.specialRequests || 'No special requests',
        booking_date: new Date().toLocaleDateString(),
        booking_time: new Date().toLocaleTimeString()
      };

      // Send email using EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      console.log('Email sent successfully to vaishalipadwal29121999@gmail.com');
      return true;
      
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Updated handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Send email notification
        const emailSent = await sendEmailNotification();
        
        if (emailSent) {
          setIsSubmitted(true);
          setShowWhatsAppOption(true);
          console.log('Form submitted and email sent:', formData);
        } else {
          setErrors({ submit: 'Failed to send booking confirmation. Please try again or contact us directly.' });
        }
      } catch (error) {
        setErrors({ submit: 'An error occurred. Please try again or contact us directly.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Clares Cove Guest House</h1>
          <p className="text-xl text-blue-800 italic">Experience Paradise in Goa</p>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-4"></div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
              <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-6">
                <h2 className="text-2xl font-bold text-white">Book Your Stay</h2>
                <p className="text-amber-100">Fill out the form below to reserve your room</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {/* Success Message with WhatsApp Option - UPDATED */}
                {isSubmitted && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">
                          {isSendingEmail ? 'Sending Confirmation...' : 'Booking Submitted Successfully!'}
                        </h3>
                        <p className="text-gray-700 mb-3">
                          {isSendingEmail 
                            ? 'Please wait while we process your booking...'
                            : 'Your booking request has been submitted and a confirmation email has been sent.'
                          }
                        </p>
                        
                        {showWhatsAppOption && !isSendingEmail && (
                          <div className="mt-4 space-y-4">
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                              <p className="text-sm text-gray-700 font-medium mb-1">Booking Summary:</p>
                              <p className="text-gray-800">
                                {selectedRoom?.name} for {nights} night{nights !== 1 ? 's' : ''}
                              </p>
                              <p className="text-gray-800">
                                {formData.adults + formData.children} guest{formData.adults + formData.children !== 1 ? 's' : ''}
                              </p>
                            </div>
                            
                            {/* WhatsApp Chat Button */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                              <p className="font-medium text-gray-800 mb-3 text-center">
                                Need instant confirmation or have questions?
                              </p>
                              <button
                                type="button"
                                onClick={openWhatsAppChat}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center space-x-3"
                              >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512">
                                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                </svg>
                                <span>Chat on WhatsApp for Instant Confirmation</span>
                              </button>
                              <p className="text-sm text-gray-600 text-center mt-2">
                                We'll send your booking details automatically
                              </p>
                            </div>
                            
                            <div className="text-center">
                              <button
                                type="button"
                                onClick={handleReset}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                Make another booking
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message for email submission */}
                {errors.submit && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{errors.submit}</p>
                        <button
                          type="button"
                          onClick={() => {
                            const phone = "7219236054";
                            const message = encodeURIComponent("I encountered an error while trying to book. Can you help me?");
                            window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
                          }}
                          className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center space-x-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                          </svg>
                          <span>Get Help on WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dates Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Check-in Date</label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={getTodayDate()}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                    {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Check-out Date</label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || getTomorrowDate()}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                    {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>}
                  </div>
                </div>

                {/* Guests Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Adults</label>
                    <input
                      type="number"
                      name="adults"
                      value={formData.adults}
                      onChange={handleNumberChange}
                      min="1"
                      max="8"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.adults && <p className="text-red-500 text-sm mt-1">{errors.adults}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Children</label>
                    <input
                      type="number"
                      name="children"
                      value={formData.children}
                      onChange={handleNumberChange}
                      min="0"
                      max="6"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    {errors.children && <p className="text-red-500 text-sm mt-1">{errors.children}</p>}
                  </div>
                </div>

                {/* Room Type */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Room Type</label>
                  <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    {roomTypes.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))}
                  </select>
                  {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
                </div>

                {/* Guest Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Special Requests */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-bold py-4 px-6 rounded-xl hover:from-amber-700 hover:to-amber-900 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSendingEmail ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Booking...
                      </>
                    ) : (
                      'Complete Booking Request'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isSendingEmail}
                    className="px-6 py-4 border-2 border-amber-600 text-amber-700 font-bold rounded-xl hover:bg-amber-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reset Form
                  </button>
                </div>

                {/* Quick WhatsApp Support Button */}
                {!isSubmitted && (
                  <div className="mt-6 text-center">
                    <p className="text-gray-600 text-sm mb-2">Need help with your booking?</p>
                    <button
                      type="button"
                      onClick={() => {
                        const phone = "7219236054";
                        const message = encodeURIComponent("Hello! I need help with booking at Clares Cove Guest House.");
                        window.open(`https://wa.me/91${phone}?text=${message}`, "_blank");
                      }}
                      className="inline-flex items-center space-x-2 text-green-600 hover:text-green-800 font-medium"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                      <span>Chat with us on WhatsApp</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-100 sticky top-8">
              <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-6">
                <h2 className="text-2xl font-bold text-white">Booking Summary</h2>
                <p className="text-blue-100">Review your stay details</p>
              </div>

              <div className="p-6">
                {/* Room Details */}
                {selectedRoom && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{selectedRoom.name}</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in</span>
                        <span className="font-medium">{formData.checkIn || 'Select date'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out</span>
                        <span className="font-medium">{formData.checkOut || 'Select date'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nights</span>
                        <span className="font-medium">{nights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests</span>
                        <span className="font-medium">{formData.adults + formData.children}</span>
                      </div>
                    </div>
                  </div>
                )}

                
                {/* Important Information */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Important Information
                  </h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Check-in: 2:00 PM | Check-out: 11:00 AM</li>
                    <li>• Free cancellation up to 7 days before check-in</li>
                    <li>• Breakfast included for all guests</li>
                    <li>• Free Wi-Fi and parking available</li>
                    <li>• Instant confirmation via WhatsApp available</li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="mt-6 text-center text-gray-600">
                  <p className="font-medium">Need help with your booking?</p>
                  <p className="text-blue-700 font-bold">+91 72192 36054</p>
                  <p className="text-sm">bookings@clarescovegoa.com</p>
                  <div className="mt-2">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 hover:scale-110 animate-bounce"
          style={{ width: '60px', height: '60px' }}
          title="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-7 h-7">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ClaresCoveBookingForm;