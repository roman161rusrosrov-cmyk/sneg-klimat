import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "../site-content";
import { InnerLayout, PageIntro, Icon } from "../site-shell";

export const metadata: Metadata = { title: "База знаний — СНЕГ", description: "Практические материалы по подбору, VRV/VRF и приёмке монтажа климатических систем." };

export default function GuidesPage() {
  return (
    <InnerLayout>
      <PageIntro eyebrow="База знаний" title="Разобраться до покупки" lead="Короткие инженерные материалы без вымышленных характеристик и опасных советов по самостоятельному ремонту." />
      <section className="inner-section"><div className="shell guide-grid">{guides.map((guide, index) => <Link href={`/guides/${guide.slug}`} className="guide-card" key={guide.slug}><span>0{index + 1}</span><div><h2>{guide.title}</h2><p>{guide.lead}</p></div><Icon name="arrow" /></Link>)}</div></section>
    </InnerLayout>
  );
}
