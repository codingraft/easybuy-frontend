
export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 mt-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">Terms and Conditions</h1>
          
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6 italic">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Use License</h2>
              <p className="mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on STYLISH's website for personal, non-commercial transitory viewing only.
              </p>
              <p className="mb-4">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on STYLISH's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Disclaimer</h2>
              <p className="mb-4">
                The materials on STYLISH's website are provided on an 'as is' basis. STYLISH makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Limitations</h2>
              <p className="mb-4">
                In no event shall STYLISH or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on STYLISH's website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}