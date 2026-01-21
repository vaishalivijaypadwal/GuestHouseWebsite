import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaExternalLinkAlt
} from 'react-icons/fa';
import Footer from '../../common/Footer/Footer.jsx'; // Note: Capital 'F' in Footer

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
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: 'Phone Number',
      details: ['+91 98765 43210'],
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Email Address',
      details: ['info@clarescove.com'],
    },
  ];

  const subjects = [
    'General Inquiry',
    'Room Booking',
    'Pricing Information',
    'Technical Support',
    'Feedback',
    'Partnership',
    'Event Booking'
  ];

  return (
  <div className="min-h-screen">
   
   
    
   

      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-12"> {/* Added flex-grow */}
        {/* Success Message */}
        {submitted && (
          <div className="fixed top-4 right-4 z-50 animate-fade-in">
            <div className="bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-lg shadow-2xl max-w-md">
              <div className="flex items-start">
                <FaCheckCircle className="text-green-500 text-2xl mr-4 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Message Sent Successfully!</h3>
                  <p className="mb-2">
                    Thank you for contacting us. We've received your message and will get back to you 
                    within 24 hours.
                  </p>
                  <p className="font-semibold">
                    Reference: <span className="text-green-600">{referenceNumber}</span>
                  </p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-green-700 hover:text-green-900 ml-4"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-gradient-to-r from-red-100 to-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8">
            <div className="flex items-start">
              <FaExclamationCircle className="text-red-500 text-2xl mr-4 flex-shrink-0" />
              <p className="flex-1 font-medium">{errors.submit}</p>
              <button 
                onClick={() => setErrors({...errors, submit: ''})}
                className="text-red-700 hover:text-red-900 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              <p className="text-gray-600 mb-8">
                When you’re facing any issue or any crisis, you need to connect with us because we understand your needs and seek to serve you. Reach out to us today.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-blue-600">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                        <div className="space-y-1">
                          {item.details.map((detail, i) => (
                            <p key={i} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                        {item.link && (
                          <a 
                            href={item.link}
                            target={item.link.includes('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-3 group"
                          >
                            {item.title === 'Our Location' ? 'View on Map' : 'Contact Now'}
                            <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon</p>
              
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                   
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <FaExclamationCircle className="mr-2" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  {/* Phone Field */}
                  <div>
                   
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                      placeholder="Enter Mobile Number"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <FaExclamationCircle className="mr-2" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div>
                   
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300`}
                      placeholder="Enter Your Email"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <FaExclamationCircle className="mr-2" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  {/* Subject Field */}
                  <div>
                    
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                 
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none`}
                    placeholder="Please describe your inquiry in detail..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <FaExclamationCircle className="mr-2" />
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Please provide as much detail as possible so we can assist you better.
                  </p>
                </div>

                {/* Consent and Submit */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 pt-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 mt-1"
                    />
                    <label htmlFor="consent" className="ml-3 text-gray-700">
                      I agree to receive follow-up communications regarding my inquiry
                    </label>
                  </div>
                  
                  {/* Replace your button with this */}
<button
  onClick={() => {
    const phoneNumber = "7219236054";
    const message = encodeURIComponent("Hello! I have an inquiry about your services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  }}
  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[200px]"
>
  <FaPaperPlane className="mr-3" />
  <span>Send on WhatsApp</span>
</button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="mt-16">
              <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="relative h-96">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3208.4142047083064!2d73.7614404!3d15.5332702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc12be238766b%3A0xec12eed050f9602f!2sClares%20Cove%20Guest%20house!5e1!3m2!1sen!2sin!4v1768374923777!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Clares Cove Guest House Location"
                    className="absolute inset-0"
                  />
                </div>
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center">
                        <FaMapMarkerAlt className="text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">Clares Cove Guest House</h4>
                        <p className="text-gray-300 mt-1">
                          Holiday St, Gauravaddo, Calangute, Goa 403516
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/maps?q=Clares+Cove+Guest+house&ll=15.5332702,73.7614404&z=17"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Footer here */}
      <Footer />
    </div>
  );
};

export default Contact;