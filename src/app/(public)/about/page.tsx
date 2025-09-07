export default function AboutPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16 flex-1">
        <h1 className="text-4xl font-bold mb-4 text-center">About Newton Physics Club</h1>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 text-center">
          The Newton Physics Club is a vibrant community of students and enthusiasts passionate about exploring the wonders of physics.
          Our mission is to foster curiosity, deepen understanding, and encourage collaboration through engaging activities, hands-on experiments, and thought-provoking discussions.
        </p>
        <h2 className="text-2xl font-semibold mb-2 mt-8">Our Vision</h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300">
          We believe that learning physics should be accessible, interactive, and fun. By bringing together like-minded individuals, we aim to create an environment where everyone can grow their knowledge and skills, regardless of their background.
        </p>
        <h2 className="text-2xl font-semibold mb-2 mt-8">What We Do</h2>
        <ul className="list-disc pl-6 mb-6 text-zinc-700 dark:text-zinc-300">
          <li>Host regular quiz bowls and competitions to challenge and inspire members</li>
          <li>Organize hands-on experiments to demonstrate key physics concepts</li>
          <li>Invite guest lecturers and industry professionals for talks and workshops</li>
          <li>Provide resources and support for academic and personal growth</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2 mt-8">Join Us</h2>
        <p className="mb-6 text-zinc-700 dark:text-zinc-300">
          Whether you are a seasoned physics lover or just starting your journey, the Newton Physics Club welcomes you!
          Connect with us, participate in our activities, and be part of a community that celebrates curiosity and discovery.
        </p>
      </div>
    </div>
  );
}
