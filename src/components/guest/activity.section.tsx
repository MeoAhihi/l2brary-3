import React from "react";

const activities = [
  {
    title: "Physics Quiz Bowl",
    description:
      "Test your knowledge and compete with fellow members in our fun and challenging quiz sessions. Prizes for top scorers!",
    image: "/images/quiz-bowl.jpg",
  },
  {
    title: "Hands-on Experiments",
    description:
      "Get practical! Participate in exciting experiments that demonstrate core physics concepts, from Newton’s laws to electromagnetism.",
    image: "/images/experiments.jpg",
  },
  {
    title: "Guest Lectures & Workshops",
    description:
      "Learn from experts! We regularly host professors and industry professionals for talks and interactive workshops.",
    image: "/images/guest-lecture.jpg",
  },
];

const ActivitySection: React.FC = () => (
  <section className="w-full py-16 bg-white dark:bg-zinc-950">
    <h2 className="text-3xl font-bold text-center mb-2">Newton Physics Club Activities</h2>
    <p className="text-lg text-zinc-600 dark:text-zinc-300 text-center mb-10">
      Explore our engaging activities designed to spark curiosity and deepen your understanding of physics.
    </p>
    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
      {activities.map((activity, idx) => (
        <div
          key={activity.title}
          className={`flex flex-col md:flex-row items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""
            } gap-8`}
        >
          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src={activity.image}
              alt={activity.title}
              className="rounded-xl shadow-lg w-full max-w-xs object-cover"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-2">{activity.title}</h3>
            <p className="text-zinc-700 dark:text-zinc-300">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ActivitySection;
