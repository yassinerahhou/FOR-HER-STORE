import Link from 'next/link';

const sections = [
  { id: 'shipping', title: 'Shipping & delivery', text: 'Orders are dispatched after confirmation. Delivery is complimentary in Morocco on orders of 500 MAD or more. Casablanca and Rabat are normally delivered within 24 hours; other Moroccan destinations normally arrive within 48 hours.' },
  { id: 'payment', title: 'Cash on delivery', text: 'Cash on Delivery is currently the only available payment method. Pay the courier after receiving your parcel. We do not collect card details on this website.' },
  { id: 'returns', title: 'Returns & exchanges', text: 'Unopened, unused products may be returned or exchanged within 14 days of delivery. Contact concierge@gaouaher.ma with your order reference before returning an item. For hygiene and safety, opened cosmetics cannot be returned unless they arrived damaged or incorrect.' },
  { id: 'privacy', title: 'Privacy policy', text: 'We use the contact and delivery details you provide only to process and support your order. We do not sell personal information. To request access, correction, or deletion of your information, email concierge@gaouaher.ma.' },
  { id: 'terms', title: 'Terms of service', text: 'Product imagery and descriptions are provided for shopping guidance. Please review the ingredient list before use and discontinue use if irritation occurs. Availability, pricing, and delivery estimates may change before order confirmation.' },
];

export default function PoliciesPage() {
  return <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
    <div className="space-y-3 border-b border-[#252525]/15 pb-8"><p className="font-mono text-xs uppercase tracking-widest text-[#b87760]">Customer care</p><h1 className="font-serif text-4xl">Store policies</h1><p className="text-[#252525]/70">Clear details for shopping with Gaouaher in Morocco.</p></div>
    {sections.map((section) => <section id={section.id} key={section.id} className="scroll-mt-32 space-y-3"><h2 className="font-serif text-2xl">{section.title}</h2><p className="leading-7 text-[#252525]/80">{section.text}</p></section>)}
    <p className="border-t border-[#252525]/15 pt-8 text-sm">Need help? <a className="underline" href="mailto:concierge@gaouaher.ma">Contact customer care</a> or <Link className="underline" href="/help">visit support</Link>.</p>
  </div>;
}
