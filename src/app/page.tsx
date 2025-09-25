"use client"

import { useState } from 'react'
import { Calendar, Clock, MapPin, Star, Phone, Mail, CheckCircle, Plus, Minus } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  image: string
}

interface AdditionalService {
  id: string
  name: string
  price: number
  selected: boolean
}

interface BookingForm {
  service: string
  serviceType: string
  date: string
  time: string
  location: string
  fullAddress: string
  vehicleType: string
  customerName: string
  customerEmail: string
  customerPhone: string
  additionalServices: AdditionalService[]
  specialRequests: string
}

export default function AllProDetails() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    service: '',
    serviceType: '',
    date: '',
    time: '',
    location: '',
    fullAddress: '',
    vehicleType: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    additionalServices: [],
    specialRequests: ''
  })

  const services: Service[] = [
    {
      id: 'basic',
      name: 'Basic Detail Package',
      description: 'Exterior wash, interior vacuum, dashboard cleaning, window cleaning',
      price: 89,
      duration: '2-3 hours',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      id: 'premium',
      name: 'Premium Detail Package',
      description: 'Everything in Basic + wax application, tire shine, leather conditioning, deep interior cleaning',
      price: 149,
      duration: '3-4 hours',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop'
    },
    {
      id: 'luxury',
      name: 'Luxury Detail Package',
      description: 'Everything in Premium + paint correction, ceramic coating, engine bay cleaning, full protection',
      price: 249,
      duration: '5-6 hours',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'
    },
    {
      id: 'ultimate',
      name: 'Ultimate Detail Package',
      description: 'Complete transformation with paint correction, ceramic coating, interior protection, engine detailing',
      price: 399,
      duration: '6-8 hours',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop'
    }
  ]

  const additionalServices: AdditionalService[] = [
    { id: 'pet-hair', name: 'Pet Hair Removal', price: 35, selected: false },
    { id: 'feces-removal', name: 'Feces Removal & Sanitization', price: 75, selected: false },
    { id: 'vomit-cleanup', name: 'Vomit Cleanup & Deodorizing', price: 65, selected: false },
    { id: 'headlight-polish', name: 'Headlight Polishing', price: 45, selected: false },
    { id: 'glass-repellent', name: 'Glass Water Repellent Treatment', price: 55, selected: false },
    { id: 'tree-sap', name: 'Tree Sap Removal', price: 40, selected: false },
    { id: 'scratch-removal', name: 'Minor Scratch Removal', price: 85, selected: false }
  ]

  const locations = ['Massachusetts', 'Rhode Island', 'New Hampshire']
  const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Van', 'Luxury Vehicle']
  const timeSlots = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']
  const serviceTypes = [
    { value: 'full', label: 'Full Detail', description: 'Complete interior and exterior service' },
    { value: 'exterior', label: 'Exterior Only', description: 'Exterior cleaning and protection only' },
    { value: 'interior', label: 'Interior Only', description: 'Interior cleaning and conditioning only' }
  ]

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setBookingForm(prev => ({ 
      ...prev, 
      service: service.name,
      serviceType: '',
      additionalServices: additionalServices.map(s => ({ ...s, selected: false }))
    }))
    setShowBooking(true)
  }

  const toggleAdditionalService = (serviceId: string) => {
    setBookingForm(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.map(service =>
        service.id === serviceId ? { ...service, selected: !service.selected } : service
      )
    }))
  }

  const calculateTotal = () => {
    const basePrice = selectedService?.price || 0
    let serviceTypeMultiplier = 1
    
    if (bookingForm.serviceType === 'exterior' || bookingForm.serviceType === 'interior') {
      serviceTypeMultiplier = 0.7 // 30% discount for partial services
    }
    
    const adjustedBasePrice = Math.round(basePrice * serviceTypeMultiplier)
    const additionalPrice = bookingForm.additionalServices
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0)
    return adjustedBasePrice + additionalPrice
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Booking request submitted successfully! We will contact you within 24 hours to confirm your appointment.')
    setShowBooking(false)
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1C1C1C] via-[#2A2A2A] to-[#1C1C1C] border-b border-[#DAA520]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 text-center md:text-left mb-4 md:mb-0">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/75e732fb-cd23-42da-bec0-ef2dd0ef045d.png" 
                alt="All Pro Details Logo" 
                className="h-20 w-auto"
                style={{ 
                  backgroundColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.3))'
                }}
              />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
                  ALL PRO DETAILS
                </h1>
                <p className="text-gray-300 text-lg mt-2">Premium Auto Detailing Services</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DAA520]" />
                <span>(555) 123-DETAIL</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DAA520]" />
                <span>info@allprodetails.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#2A2A2A] to-[#1C1C1C] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Luxury Auto Detailing</span>
            <br />
            <span className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
              At Your Location
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional mobile auto detailing services serving Massachusetts, Rhode Island, and New Hampshire. 
            We bring premium car care directly to your doorstep.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {locations.map((location) => (
              <div key={location} className="flex items-center gap-2 bg-[#2A2A2A] px-4 py-2 rounded-full border border-[#DAA520]">
                <MapPin className="w-4 h-4 text-[#DAA520]" />
                <span className="text-white">{location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      {!showBooking && (
        <section className="py-20 bg-[#2A2A2A]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
                Our Service Packages
              </span>
            </h3>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Choose from our comprehensive detailing packages, each designed to restore and protect your vehicle
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-[#1C1C1C] border border-[#3A3A3A] rounded-2xl overflow-hidden hover:border-[#DAA520] transition-all duration-300 hover:scale-105">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{service.name}</h4>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-[#DAA520]">${service.price}</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleServiceSelect(service)}
                      className="w-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-black font-bold py-3 rounded-lg hover:from-[#FFD700] hover:to-[#DAA520] transition-all duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      {showBooking && selectedService && (
        <section className="py-20 bg-[#2A2A2A]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-[#1C1C1C] border border-[#3A3A3A] rounded-2xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-[#DAA520]">Book Your Service</h3>
                <button
                  onClick={() => setShowBooking(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="bg-[#2A2A2A] p-6 rounded-lg mb-8">
                <h4 className="text-xl font-bold text-white mb-2">Selected Package</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#DAA520] font-semibold">{selectedService.name}</p>
                    <p className="text-gray-400 text-sm">{selectedService.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-[#DAA520]">${selectedService.price}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Type Selection */}
                <div>
                  <label className="block text-white font-semibold mb-4">Service Type *</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {serviceTypes.map((type) => (
                      <div key={type.value} className="relative">
                        <input
                          type="radio"
                          id={type.value}
                          name="serviceType"
                          value={type.value}
                          checked={bookingForm.serviceType === type.value}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, serviceType: e.target.value }))}
                          className="sr-only"
                          required
                        />
                        <label
                          htmlFor={type.value}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            bookingForm.serviceType === type.value
                              ? 'border-[#DAA520] bg-[#DAA520]/10'
                              : 'border-[#3A3A3A] hover:border-[#555555]'
                          }`}
                        >
                          <div className="text-center">
                            <h5 className="font-bold text-white mb-1">{type.label}</h5>
                            <p className="text-sm text-gray-400">{type.description}</p>
                            {(type.value === 'exterior' || type.value === 'interior') && (
                              <p className="text-xs text-[#DAA520] mt-2">30% discount applied</p>
                            )}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, customerName: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={bookingForm.customerEmail}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.customerPhone}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Vehicle Type *</label>
                    <select
                      required
                      value={bookingForm.vehicleType}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, vehicleType: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    >
                      <option value="">Select Vehicle Type</option>
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Service State *</label>
                    <select
                      required
                      value={bookingForm.location}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    >
                      <option value="">Select State</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-white font-semibold mb-2">Complete Service Address *</label>
                  <textarea
                    required
                    value={bookingForm.fullAddress}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, fullAddress: e.target.value }))}
                    rows={3}
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    placeholder="Enter your complete address including street, city, state, and ZIP code..."
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Preferred Time *</label>
                    <select
                      required
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Services */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Additional Services</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {additionalServices.map((service) => (
                      <div key={service.id} className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => toggleAdditionalService(service.id)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                bookingForm.additionalServices.find(s => s.id === service.id)?.selected
                                  ? 'bg-[#DAA520] border-[#DAA520]'
                                  : 'border-gray-400'
                              }`}
                            >
                              {bookingForm.additionalServices.find(s => s.id === service.id)?.selected && (
                                <CheckCircle className="w-4 h-4 text-black" />
                              )}
                            </button>
                            <span className="text-white font-medium">{service.name}</span>
                          </div>
                          <span className="text-[#DAA520] font-bold">+${service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-white font-semibold mb-2">Special Requests or Notes</label>
                  <textarea
                    value={bookingForm.specialRequests}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, specialRequests: e.target.value }))}
                    rows={4}
                    className="w-full bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white focus:border-[#DAA520] focus:outline-none"
                    placeholder="Any specific requirements, vehicle condition notes, or special instructions..."
                  />
                </div>

                {/* Total and Submit */}
                <div className="bg-[#2A2A2A] p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-white">Total Amount:</span>
                    <span className="text-3xl font-bold text-[#DAA520]">${calculateTotal()}</span>
                  </div>
                  {(bookingForm.serviceType === 'exterior' || bookingForm.serviceType === 'interior') && (
                    <p className="text-sm text-[#DAA520] mb-4 text-center">
                      30% discount applied for {bookingForm.serviceType} only service
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] text-black font-bold py-4 rounded-lg hover:from-[#FFD700] hover:to-[#DAA520] transition-all duration-300 text-lg"
                  >
                    Submit Booking Request
                  </button>
                  <p className="text-gray-400 text-sm text-center mt-3">
                    We'll contact you within 24 hours to confirm your appointment and arrange payment
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {!showBooking && (
        <section className="py-20 bg-[#1C1C1C]">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
                Why Choose All Pro Details?
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Mobile Service</h4>
                <p className="text-gray-400">We come to you! Service at your home, office, or any convenient location.</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Premium Quality</h4>
                <p className="text-gray-400">Professional-grade products and techniques for exceptional results.</p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#DAA520] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Satisfaction Guaranteed</h4>
                <p className="text-gray-400">100% satisfaction guarantee on all our services. Your happiness is our priority.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1C1C1C] via-[#2A2A2A] to-[#1C1C1C] border-t border-[#DAA520] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/75e732fb-cd23-42da-bec0-ef2dd0ef045d.png" 
                  alt="All Pro Details Logo" 
                  className="h-16 w-auto"
                  style={{ 
                    backgroundColor: 'transparent',
                    filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.3))'
                  }}
                />
                <h4 className="text-2xl font-bold bg-gradient-to-r from-[#DAA520] to-[#FFD700] bg-clip-text text-transparent">
                  ALL PRO DETAILS
                </h4>
              </div>
              <p className="text-gray-400 mb-4">
                Premium mobile auto detailing services bringing luxury car care directly to your location.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-[#DAA520]" />
                  <span className="text-gray-300">(555) 123-DETAIL</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-bold text-white mb-4">Service Areas</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Massachusetts</li>
                <li>Rhode Island</li>
                <li>New Hampshire</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold text-white mb-4">Business Hours</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
                <li>Saturday: 8:00 AM - 5:00 PM</li>
                <li>Sunday: 10:00 AM - 4:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#3A3A3A] mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 All Pro Details. All rights reserved. | Licensed & Insured
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}