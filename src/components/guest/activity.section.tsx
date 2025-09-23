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
  <section className="w-full bg-white py-16 dark:bg-zinc-950">
    <h2 className="mb-2 text-center text-3xl font-bold">
      Newton Physics Club Activities
    </h2>
    <p className="mb-10 text-center text-lg text-zinc-600 dark:text-zinc-300">
      Explore our engaging activities designed to spark curiosity and deepen
      your understanding of physics.
    </p>
    <div className="mx-auto flex max-w-4xl flex-col gap-12">
      {activities.map((activity, idx) => (
        <div
          key={activity.title}
          className={`flex flex-col items-center md:flex-row ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          } gap-8`}
        >
          <div className="flex w-full justify-center md:w-1/2">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full max-w-xs rounded-xl object-cover shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="mb-2 text-2xl font-semibold">{activity.title}</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              {activity.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ActivitySection;
