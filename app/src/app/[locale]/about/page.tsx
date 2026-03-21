import { useLocale } from "next-intl";
import Link from "next/link";
import { Anchor, Heart, Shield, Waves } from "lucide-react";

const content = {
  en: {
    title: "About Us",
    subtitle: "Your trusted speedboat tour operator in Budva, Montenegro.",
    story: "We are a family-run speedboat tour business based at Budva Marina. Our passion is sharing the breathtaking beauty of the Montenegrin coast with visitors from around the world.",
    story2: "Every tour is run by an experienced, licensed skipper who knows every hidden cove and perfect swimming spot along the riviera. We are committed to safety, quality, and making your day on the water truly unforgettable.",
    values: [
      { icon: Shield, title: "Safety First", desc: "Experienced, licensed skippers. All safety equipment on board. Decisions based on weather conditions." },
      { icon: Heart, title: "Passion for the Sea", desc: "We love the Montenegrin coast and want to share its beauty with you. Personal, attentive service." },
      { icon: Waves, title: "All-Inclusive", desc: "Skipper, fuel and welcome drink always included. No hidden costs. Transparent pricing." },
    ],
    cta: "Book Your Tour",
  },
  sr: {
    title: "O nama",
    subtitle: "Vaš pouzdani operater speedboat tura u Budvi, Crna Gora.",
    story: "Mi smo porodičan biznis speedboat tura sa Budva Marine. Naša strast je deljenje zapanjujuće lepote crnogorskog primorja sa posetiocima iz celog sveta.",
    story2: "Svaku turu vodi iskusan, licencirani skipper koji zna svaku skrivenu uvalu i savršeno mesto za kupanje duž rivijere. Posvećeni smo bezbednosti, kvalitetu i tome da vaš dan na vodi bude zaista nezaboravan.",
    values: [
      { icon: Shield, title: "Bezbednost na prvom mestu", desc: "Iskusni, licencirani skipperi. Sva bezbednosna oprema na brodu. Odluke na osnovu vremenskih uslova." },
      { icon: Heart, title: "Ljubav prema moru", desc: "Volimo crnogorsko primorje i želimo da podelimo njegovu lepotu sa vama. Lični, pažljiv servis." },
      { icon: Waves, title: "Sve uključeno", desc: "Skipper, gorivo i voda dobrodošlice uvek uključeni. Bez skrivenih troškova. Transparentne cene." },
    ],
    cta: "Rezerviši turu",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

function AboutContent() {
  const locale = "en" as string;
  const data = content[locale as "en" | "sr"] || content.en;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-sky-600 text-white py-20 text-center px-4">
        <Anchor className="h-12 w-12 mx-auto mb-4 opacity-80" />
        <h1 className="text-4xl font-bold mb-3">{data.title}</h1>
        <p className="text-sky-100 text-lg max-w-xl mx-auto">{data.subtitle}</p>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-10">
          <p className="text-slate-600 text-lg leading-relaxed mb-4">{data.story}</p>
          <p className="text-slate-600 leading-relaxed">{data.story2}</p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {data.values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-sm">{v.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/en/tours"
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-4 rounded-xl transition-colors"
          >
            {data.cta} →
          </Link>
        </div>
      </div>
    </div>
  );
}
