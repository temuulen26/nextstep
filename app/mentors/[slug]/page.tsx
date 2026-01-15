import { mentors } from "@/data/mentors";
import { notFound } from "next/navigation";
import MentorDetailClient from "@/components/MentorDetailClient";

export default async function MentorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mentor = mentors.find((m) => m.slug === slug);
  if (!mentor) return notFound();

  return <MentorDetailClient mentor={mentor} />;
}
