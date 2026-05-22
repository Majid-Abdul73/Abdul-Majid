import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py -24 lg:py-28 bg- black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text (Bio, Skills, Experience) */}
          <div className="space-y-12">

            {/* Header */}
            <div className="mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                About Me
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold">
                The Engineer Behind the Work
              </h2>
            </div>


            {/* Bio */}
            <div className="space-y-5 text- white/60 text-base leading-relaxed">
              <p>
                I&apos;m a Software Engineer with 5+ years of experience building
                scalable web and mobile applications for startups, enterprises, and NGOs
                across Africa and globally.
              </p>
              <p>
                I specialize in full-stack development, system design, and technical
                leadership. My work sits at the intersection of clean code, pragmatic
                architecture, and real-world business impact.
              </p>
              <p>
                Beyond engineering, I&apos;m deeply invested in growing the African tech
                ecosystem — through mentorship, training, open source, and speaking at
                conferences and universities.
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full h-[500px] lg:h-full min-h-[500px] overflow-hidden border border-border lg:sticky lg:top-24">
            <Image
              // src="/bg/about-us.png"
              // src="/img/img1.jpg"
              src="/img/img22.jpg"
              alt="About Me"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Optional overlay gradient for styling */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
