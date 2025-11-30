export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">About Easybuy</h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Your premier destination for contemporary fashion and timeless style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-2xl transform translate-x-4 translate-y-4"></div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Our Story"
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2025, Easybuy has grown from a small boutique to a
              leading fashion destination. We believe that everyone deserves to
              look and feel their best, which is why we curate collections that
              combine quality, style, and affordability.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our team of fashion experts works tirelessly to bring you the latest
              trends and timeless classics, ensuring that our collection stays
              fresh and exciting while maintaining the highest standards of
              quality.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide accessible, high-quality fashion that empowers
              individuals to express their unique style.
            </p>
          </div>
          <div className="text-center p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👁️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              To become the go-to destination for fashion-conscious individuals
              seeking quality and style.
            </p>
          </div>
          <div className="text-center p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Quality, sustainability, inclusivity, and exceptional customer
              service guide everything we do.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
