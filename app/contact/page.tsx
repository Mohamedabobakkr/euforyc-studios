'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import Map from '@/components/Map';
import { TikTokIcon } from '@/components/icons/TikTokIcon';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll use mailto. In production, this would integrate with a form service
    const subject = encodeURIComponent('Inquiry from Euforyc Studios Website');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:euforyc@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="section-padding py-24">
        <div className="container-width text-center">
          <h1 className="heading-primary mb-8">Get in Touch</h1>
          <p className="body-text text-xl max-w-3xl mx-auto">
            Have questions about our classes, membership options, or want to learn more 
            about the Euforyc experience? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="heading-secondary">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-inter text-sm font-medium text-[#1a260e] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#1a260e]/20 bg-[#fffcf2] focus:border-[#1a260e] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your wellness goals or any questions you have..."
                  />
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <h2 className="heading-secondary">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Studio Location</h3>
                    <p className="body-text">
                      7 Holmstall Ave<br />
                      Edgware HA8 5HX<br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Phone</h3>
                    <p className="body-text">
                      <a href="tel:+447375710370" className="hover:text-[#1a260e]/70 transition-colors">
                      +44 7375 710370
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Email</h3>
                    <p className="body-text">
                      <a href="mailto:euforyc@gmail.com" className="hover:text-[#1a260e]/70 transition-colors">
                        euforyc@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-[#1a260e] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg font-light mb-2">Studio Hours</h3>
                    <div className="body-text space-y-1">
                      <p>Monday - Friday: 6:45 AM - 8:00 PM</p>
                      <p>Saturday - Sunday: 8:45 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <h3 className="font-serif text-lg font-light mb-3">Follow Us</h3>
                    <div className="space-y-3">
                      <p>
                        <a 
                          href="https://instagram.com/euforyc" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-[#1a260e]/70 transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-[#1a260e] mr-2" />
                          <span>Instagram: @euforyc</span>
                        </a>
                      </p>
                      <p>
                        <a 
                          href="https://www.tiktok.com/@euforyc" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-[#1a260e]/70 transition-colors"
                        >
                          <TikTokIcon className="h-5 w-5 text-[#1a260e] mr-2" />
                          <span>TikTok: @euforyc</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Map Section */}
      <section className="relative">
        {/* Decorative transition */}
        <div className="h-24 bg-gradient-to-b from-[#fffcf2] to-[#faf8f3]"></div>
        
        {/* Map Title with elegant styling */}
        <div className="absolute top-0 left-0 right-0 z-30 text-center">
          <div className="inline-block bg-[#fffcf2] px-12 py-4 rounded-full shadow-lg">
            <h2 className="font-serif text-3xl font-light text-[#1a260e] tracking-wider">FIND US</h2>
          </div>
        </div>
        
        {/* Full viewport map with aesthetic presentation */}
        <div className="relative" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
          <Map />
        </div>
        
        {/* Transportation Info with elegant design */}
        <div className="bg-gradient-to-b from-[#faf8f3] to-[#fffcf2] py-12">
          <div className="container-width text-center space-y-4">
            <div className="inline-flex items-center space-x-4 mb-4">
              <div className="h-px w-16 bg-[#1a260e]/20"></div>
              <p className="font-serif text-lg font-light text-[#1a260e] tracking-wider">GETTING HERE</p>
              <div className="h-px w-16 bg-[#1a260e]/20"></div>
            </div>
            <p className="font-sans text-sm text-[#1a260e]/70 max-w-2xl mx-auto">
              We're located in Edgware, easily accessible by public transport. 
              Just a short walk from Edgware Station on the Northern Line.
            </p>
            <p className="font-sans text-xs text-[#1a260e]/50 tracking-wider uppercase">
              Bus routes: 32 • 142 • 186 • 204
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}