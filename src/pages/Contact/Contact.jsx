import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaWhatsapp,
  FaPhoneAlt
} from 'react-icons/fa';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [referenceNumber, setReferenceNumber] = useState('');
  const [mounted, setMounted] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    // Animate cards one by one on mount
    const timer1 = setTimeout(() => setAnimatedCards([0]), 200);
    const timer2 = setTimeout(() => setAnimatedCards([0, 1]), 400);
    const timer3 = setTimeout(() => setAnimatedCards([0, 1, 2]), 600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setMounted(false);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const generateRefNumber = () => {
    return 'REF-' + Date.now().toString().slice(-6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Shake animation for error
      const form = e.target;
      form.classList.add('animate-shake');
      setTimeout(() => {
        form.classList.remove('animate-shake');
      }, 500);
      
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate reference number before submission
      const refNumber = generateRefNumber();
      setReferenceNumber(refNumber);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      
      setSubmitted(true);
      setErrors({});
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: 'Our Location',
      details: ['Holiday St, Gauravaddo, Calangute, Goa 403516'],
      index: 0
    },
    {
  icon: <FaPhone className="text-2xl" />,
  title: 'Phone Number',
  details: ['+91 7249171196', '+91 89993 58172'],
  index: 2
},
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email Address',
      details: ['clarescovegoa@gmail.com'],
      index: 2
    },
  ];

 return (
  <div className="min-h-screen bg-white"> {/* Changed to white background */}
      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        
        /* Smooth transitions */
        .transition-all-300 {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .transition-transform-300 {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .transition-all-500 {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Hover effects */
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .hover-grow:hover {
          transform: scale(1.05);
        }
        
        .hover-shrink:active {
          transform: scale(0.95);
        }
      `}</style>

      {/* Success Notification */}
      {submitted && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:w-96 z-50">
          <div className={`animate-bounceIn bg-green-500 text-white p-4 rounded-lg shadow-lg`}>
            <div className="flex items-center space-x-3">
              <FaCheckCircle className="text-xl" />
              <div className="flex-1">
                <p className="font-semibold">Message Sent Successfully!</p>
                <p className="text-sm opacity-90">Reference: {referenceNumber}</p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-white hover:text-gray-200 transition-all-300"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errors.submit && (
        <div className={`fixed top-4 right-4 left-4 md:left-auto md:w-96 z-50 animate-slideUp`}>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <FaExclamationCircle className="text-xl" />
              <div className="flex-1">
                <p className="font-semibold">Submission Failed</p>
                <p className="text-sm opacity-90">{errors.submit}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className={`py-16 relative ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 delay-200 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className={`text-gray-600 max-w-2xl mx-auto text-lg delay-300 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactInfo.map((info) => (
              <div
                key={info.index}
                className={`group cursor-pointer transition-all-500 ${
                  animatedCards.includes(info.index) ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ animationDelay: `${info.index * 200}ms` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all-300 border border-gray-200 hover-lift">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-all-300">
                      <div className="text-blue-600 group-hover:scale-110 transition-transform-300">
                        {info.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600">
                      {info.details[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map Section */}
      <section className="py-16">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto ${mounted ? 'animate-fadeIn delay-500' : 'opacity-0'}`}>
          {/* Contact Form - Takes 1/3 on large screens */}
          <div className={`lg:col-span-1 bg-white rounded-2xl shadow-xl p-8 border border-gray-200 ${mounted ? 'animate-slideInLeft delay-600' : 'opacity-0'}`}>
           

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                <div>
                 
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveInput('name')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="Enter Name"
                    className={`w-full border rounded-xl px-4 py-3 transition-all-300 focus:outline-none ${
                      errors.name 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                    } ${activeInput === 'name' ? 'ring-2 ring-blue-500 ring-opacity-20 scale-[1.02]' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                      <FaExclamationCircle /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                 
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveInput('email')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="Email Address"
                    className={`w-full border rounded-xl px-4 py-3 transition-all-300 focus:outline-none ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                    } ${activeInput === 'email' ? 'ring-2 ring-blue-500 ring-opacity-20 scale-[1.02]' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                      <FaExclamationCircle /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                <div>
                 
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveInput('phone')}
                    onBlur={() => setActiveInput(null)}
                    placeholder="Phone Number"
                    className={`w-full border rounded-xl px-4 py-3 transition-all-300 focus:outline-none ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                    } ${activeInput === 'phone' ? 'ring-2 ring-blue-500 ring-opacity-20 scale-[1.02]' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                      <FaExclamationCircle /> {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none transition-all-300"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Room Booking">Room Booking</option>
                    <option value="Feedback">Feedback</option>
                   </select>
                </div>
              </div>

              <div>
               
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveInput('message')}
                  onBlur={() => setActiveInput(null)}
                  placeholder="Tell us about your requirements..."
                  className={`w-full border rounded-xl px-4 py-3 transition-all-300 resize-none focus:outline-none ${
                    errors.message 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20'
                  } ${activeInput === 'message' ? 'ring-2 ring-blue-500 ring-opacity-20 scale-[1.02]' : ''}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1 animate-fadeIn">
                    <FaExclamationCircle /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const phoneNumber = "8999358172";
                  const message = encodeURIComponent("Hello! I would like to know more about your services.");
                  window.open(`https://wa.me/91${phoneNumber}?text=${message}`, "_blank");
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all-300 hover-grow hover-shrink flex items-center justify-center gap-3"
              >
                <FaPaperPlane />
                Send Message 
              </button>

              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={() => {
                  const phoneNumber = "7249171196";
                  const message = encodeURIComponent("Hello! I would like to know more about your services.");
                  window.open(`https://wa.me/91${phoneNumber}?text=${message}`, "_blank");
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all-300 hover-grow hover-shrink flex items-center justify-center gap-3"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </button>
            </form>
          </div>

          {/* Google Map - Takes 2/3 on large screens */}
          <div className={`lg:col-span-2 relative h-full min-h-[500px] lg:min-h-[600px] ${mounted ? 'animate-slideInRight delay-700' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50" />
            <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.4142047083064!2d73.7614404!3d15.5332702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc12be238766b%3A0xec12eed050f9602f!2sClares%20Cove%20Guest%20house!5e1!3m2!1sen!2sin!4v1768374923777!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="absolute inset-0"
                loading="lazy"
                allowFullScreen
                title="Clares Cove Guest House Location"
                style={{ border: 0 }}
              />
            </div>
            
            {/* Map Overlay Info */}
            <div className={`absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg delay-1000 ${mounted ? 'animate-slideUp' : 'opacity-0'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Our Location</h4>
                  <p className="text-sm text-gray-600">Holiday St, Gauravaddo, Calangute, Goa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      {mounted && (
        <>
         

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/7249171196"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 animate-float animate-scaleIn transition-all-300 hover-grow"
            style={{ animationDelay: '900ms' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-14 h-14 drop-shadow-2xl transition-transform-300"
              />
            </div>
          </a>
        </>
      )}

    </div>
  );
};

export default Contact;