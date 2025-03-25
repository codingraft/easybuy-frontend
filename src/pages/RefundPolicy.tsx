
export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      
      <div className="prose prose-lg">
        <p className="mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Return Period</h2>
          <p className="mb-4">
            We accept returns within 30 days of purchase. Items must be:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Unworn and unwashed</li>
            <li>In original packaging</li>
            <li>With all tags attached</li>
            <li>Accompanied by the original receipt</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Refund Process</h2>
          <p className="mb-4">
            Once we receive your return:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>We will inspect the item within 2 business days</li>
            <li>Approved refunds will be processed within 5 business days</li>
            <li>Refunds will be issued to the original payment method</li>
            <li>Shipping costs are non-refundable</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Exchange Policy</h2>
          <p className="mb-4">
            We offer exchanges for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Different sizes of the same item</li>
            <li>Different colors of the same item</li>
            <li>Defective items</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. Non-Returnable Items</h2>
          <p className="mb-4">
            The following items cannot be returned:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Intimate apparel</li>
            <li>Sale items</li>
            <li>Gift cards</li>
            <li>Customized items</li>
          </ul>
        </section>
      </div>
    </div>
  );
}