import { Link } from 'react-router';
import { ChevronDown, Play } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-background py-4 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/favicon.png" alt="Restzo" className="h-6 w-auto" />
            <span className="ml-2 text-lg font-medium text-foreground">Restzo</span>
          </Link>
          <div className="flex items-center">
            <div className="flex ml-10 space-x-12">
              <Link
                to="/#"
                className="text-sm font-medium flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <span>
                  <ChevronDown />
                </span>{' '}
                Products
              </Link>
              <Link
                to="/#"
                className="text-sm font-medium flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <span>
                  <ChevronDown />
                </span>{' '}
                Solutions
              </Link>
              <Link
                to="/#"
                className="text-sm font-medium flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <span>
                  <ChevronDown />
                </span>{' '}
                Learn
              </Link>
              <Link
                to="/#"
                className="text-sm font-medium flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <span>
                  <ChevronDown />
                </span>{' '}
                Blog
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/login"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/80 "
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
              >
                Sign Up
              </Link>
              <Link
                to="/dashboard"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Optimize Your Business
            <br />
            With Advanced POS
          </h1>
          <div className="max-w-2xl mx-auto mb-10">
            <Link
              to="/dashboard"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Get Started Free
            </Link>
          </div>
          <div className="max-w-6xl mx-auto">
            <img
              src="/image.png"
              alt="POS Dashboard Preview"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Providing Digital Solutions To
            <br />
            Over 150,000 Businesses.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Our comprehensive POS system streamlines operations, enhances customer experience, and
            boosts your bottom line.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            <div className="text-center">
              <p className="font-medium text-muted-foreground">Cash Management</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-muted-foreground">Contactless</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-muted-foreground">24/7 POS</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-muted-foreground">Reports</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-muted-foreground">Stocks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Maximize Your Hospitality
              <br />
              Potential With Our Guidance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Streamline your restaurant operations with our advanced POS system designed
              specifically for the hospitality industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-bold mb-4">Sales Management</h3>
              <p className="text-muted-foreground mb-6">
                Track sales in real-time, manage orders efficiently, and optimize your menu
                performance with our intuitive dashboard.
              </p>
              <img
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Sales Management"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Inventory Management</h3>
              <p className="text-muted-foreground mb-6">
                Keep track of your stock levels, receive low inventory alerts, and manage suppliers
                all in one place.
              </p>
              <img
                src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                alt="Inventory Management"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Analytics & Reporting</h3>
            <p className="text-muted-foreground mb-6">
              Gain valuable insights with comprehensive reports on sales, inventory, staff
              performance, and customer preferences.
            </p>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Analytics and Reporting"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              What Our POS System
              <br />
              Does And How It Works
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
            <div className="md:w-1/2 relative">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="How It Works Video"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4">
                  <Play size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-muted/30 p-6 rounded-lg shadow border border-border ">
              <h3 className="text-lg font-bold mb-3">Customized Order Programs</h3>
              <p className="text-muted-foreground">
                Tailor your ordering system to match your business needs with customizable menus and
                order flows.
              </p>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg shadow border border-border ">
              <h3 className="text-lg font-bold mb-3">Online Orders</h3>
              <p className="text-muted-foreground">
                Seamlessly integrate online ordering with your in-store POS system for unified
                operations.
              </p>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg shadow border border-border ">
              <h3 className="text-lg font-bold mb-3">CRM Integration</h3>

              <p className="text-muted-foreground">
                Connect customer data across platforms to deliver personalized experiences and
                targeted marketing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Empowering
              <br />
              Over 150,000 Businesses To
              <br />
              Thrive In The Digital Age.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their operations with our
              comprehensive POS solution.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Customer Testimonial 1"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Customer Testimonial 2"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Customer Testimonial 3"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Customer Testimonial 4"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                alt="Customer Testimonial 5"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                alt="Customer Testimonial 6"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              Managing transactions and tracking inventory has never been easier since integrating
              Tumbas POS
            </h2>
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
                  alt="Customer Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-bold">Camilla Rios</p>
                <p className="text-muted-foreground text-sm">Restaurant Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="POS on Tablet"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">
                Maximize Efficiency
                <br />
                -Boost Sales
              </h2>
              <p className="text-muted-foreground mb-6">
                Upgrade Your Business Through Seamless Order Management, Inventory Tracking, and
                Detailed Analytics
              </p>
              <Link
                to="/signup"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Optimize Your Hospitality
              <br />
              Business With Tumbas
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-background rounded-lg shadow-lg p-4 flex items-center w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border-none outline-none"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/pos" className="text-muted-foreground hover:text-foreground text-sm">
                    POS System
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventory"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analytics"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-muted-foreground hover:text-foreground text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/webinars"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-foreground text-sm">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-muted-foreground text-sm">info@tumbas.com</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Tumbas POS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
