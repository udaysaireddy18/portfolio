import { skillCategories } from "../data/portfolio";
import { SectionHeading } from "../components/SectionHeading";
import { TiltCard } from "../components/TiltCard";
import { LayersIcon } from "../components/icons";
import "./skills.css";

const GLYPH: Record<string, string> = {
  C: "#",
  "C++": "++",
  Python: "Py",
  HTML: "<>",
  CSS: "{}",
  JavaScript: "JS",
  MySQL: "DB",
  Supabase: "SB",
  Firebase: "FB",
  Git: "⑂",
  GitHub: "GH",
  "VS Code": "</>",
  Vercel: "▲",
  Render: "R",
  "Data Analytics": "DA",
  "Adobe Premiere Pro": "PR",
};

export function Skills() {
  return (
    <section className="section section--tight" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <SectionHeading
          eyebrow="Toolkit"
          title={<span id="skills-heading">Technical Skills</span>}
          lead="Languages, data tools and the workflow I use to turn ideas into working software. Categories only — no invented proficiency scores."
          aside={
            <span className="badge">
              <LayersIcon width={13} height={13} />
              {skillCategories.length} categories · {skillCategories.reduce((sum, c) => sum + c.skills.length, 0)} skills
            </span>
          }
        />

        <div className="skills__grid">
          {skillCategories.map((category, categoryIndex) => (
            <TiltCard
              as="article"
              key={category.id}
              className="skills__col reveal"
              style={{ ["--reveal-delay" as string]: `${categoryIndex * 70}ms` }}
              max={5}
            >
              <div className="skills__card glass">
                <span className="skills__watermark mono" aria-hidden="true">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </span>
                <header className="skills__head">
                  <h3 className="skills__title">{category.title}</h3>
                  <span className="skills__count mono">{category.skills.length}</span>
                </header>
                <p className="skills__blurb">{category.blurb}</p>

                <ul className="skills__list">
                  {category.skills.map((skill, index) => (
                    <li
                      key={skill.name}
                      className="skills__item"
                      style={{ ["--i" as string]: index }}
                      tabIndex={0}
                    >
                      <span className="skills__glyph" aria-hidden="true">
                        {GLYPH[skill.name] ?? skill.name.slice(0, 2)}
                      </span>
                      <span className="skills__name">{skill.name}</span>
                      <span className="skills__kind mono">{skill.kind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>

        <ol className="skills__flow reveal" aria-label="How I work">
          {["Learn", "Build", "Refine", "Ship"].map((step, index) => (
            <li className="skills__flow-step" key={step}>
              <span className="skills__flow-num mono" aria-hidden="true">
                0{index + 1}
              </span>
              <span className="skills__flow-name">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}