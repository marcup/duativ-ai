import React from 'react';
import { Brain, MessageSquare, Rocket } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/duativ-logo.png" alt="Duativ" className="h-8" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#contact" className="text-gray-600 hover:text-gray-900">About Me</a>
              <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforming Business Through
              <span className="text-[#FF4500]"> AI Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              I help businesses leverage artificial intelligence to drive growth, 
              efficiency, and innovation in the digital age.
            </p>
            <div className="flex justify-center">
              <button className="border border-black px-8 py-3 rounded-full hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">My Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8 text-[#FF4500]" />,
                title: "AI Consulting",
                description: "Strategic guidance on implementing AI solutions for your business needs."
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-[#FF4500]" />,
                title: "AI Agents",
                description: "Intelligent agents to enhance customer experience."
              },
              {
                icon: <Rocket className="w-8 h-8 text-[#FF4500]" />,
                title: "AI Integration",
                description: "Seamless integration of AI into your existing systems."
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8">
              Contact me today to learn how I can help transform your business with AI.
            </p>
            <button className="bg-[#FF4500] text-white px-8 py-3 rounded-full hover:bg-[#FF5722]">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src="/duativ-logo.png" alt="Duativ" className="h-8 mb-4" />
              <p className="text-gray-400">
                Transforming businesses through AI innovation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Consulting</li>
                <li>AI Agents</li>
                <li>AI Integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Me</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://www.linkedin.com/company/duativ" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
                <li><a href="https://www.facebook.com/duativ" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
                <li>Medium</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Duativ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;