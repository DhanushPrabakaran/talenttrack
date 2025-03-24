import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Student Profiles",
    description:
      "Comprehensive student profiles with resumes, skills, certifications, and achievements.",
  },
  {
    title: "Job Polls & Applications",
    description:
      "Students can express interest in job opportunities through polls, making hiring easier for admins.",
  },
  {
    title: "Admin Dashboard",
    description:
      "A centralized dashboard for managing students, job postings, and placement events.",
  },
  {
    title: "Event Management",
    description:
      "A calendar view for students to stay updated on placement-related events.",
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-600 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold">College Placement Portal</h1>
        <p className="mt-4 text-lg">
          Manage student profiles, job polls, and placement events effortlessly.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block bg-white text-blue-600 px-6 py-2 rounded-md font-semibold"
        >
          Get Started
        </Link>
      </header>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={"/Banner.jpeg"}
                alt={feature.title}
                width={600}
                height={400}
                className="rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-blue-600 text-white text-center py-8">
        <h2 className="text-2xl font-semibold">
          Start Your Placement Journey Today!
        </h2>
        <Link
          href="/register"
          className="mt-4 inline-block bg-white text-blue-600 px-6 py-2 rounded-md font-semibold"
        >
          Join Now
        </Link>
      </footer>
    </div>
  );
}
