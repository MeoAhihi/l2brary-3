import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px]">
        <h1 className="mb-4 text-center text-3xl font-bold sm:text-5xl">
          Explore physics with <br />
          <span className="text-primary">Newton Club</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-center text-lg sm:text-2xl">
          Newton Club is a community for curious minds to learn, discuss, and
          explore the wonders of physics together.
        </p>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-6 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:px-8 sm:text-base dark:hover:bg-[#ccc]"
            type="button"
          >
            Join Now
          </Button>
          <Button
            className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:px-8 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            type="button"
            variant="outline"
          >
            Explore Courses
          </Button>
        </div>
      </main>
      {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
