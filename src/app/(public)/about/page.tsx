export default function AboutPage() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <div className="mx-auto max-w-3xl flex-1 px-4 py-16">
        <h1 className="mb-4 text-center text-4xl font-bold">
          About Newton Physics Club
        </h1>
        <p className="mb-8 text-center text-lg text-zinc-700 dark:text-zinc-300">
          The Newton Physics Club is a vibrant community of students and
          enthusiasts passionate about exploring the wonders of physics. Our
          mission is to foster curiosity, deepen understanding, and encourage
          collaboration through engaging activities, hands-on experiments, and
          thought-provoking discussions.
        </p>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Our Vision</h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300">
          We believe that learning physics should be accessible, interactive,
          and fun. By bringing together like-minded individuals, we aim to
          create an environment where everyone can grow their knowledge and
          skills, regardless of their background.
        </p>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">What We Do</h2>
        <ul className="mb-6 list-disc pl-6 text-zinc-700 dark:text-zinc-300">
          <li>
            Host regular quiz bowls and competitions to challenge and inspire
            members
          </li>
          <li>
            Organize hands-on experiments to demonstrate key physics concepts
          </li>
          <li>
            Invite guest lecturers and industry professionals for talks and
            workshops
          </li>
          <li>
            Provide resources and support for academic and personal growth
          </li>
        </ul>
        <h2 className="mt-8 mb-2 text-2xl font-semibold">Join Us</h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300">
          Whether you are a seasoned physics lover or just starting your
          journey, the Newton Physics Club welcomes you! Connect with us,
          participate in our activities, and be part of a community that
          celebrates curiosity and discovery.
        </p>
      </div>
    </div>
  );
}
