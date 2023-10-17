"use client"

import { Fragment, useState } from "react";
import { Section } from "./components/section";
import { sections, topNOptions } from "./const";

const Home = () => {
  const [selectedSection, setSelectedSection] = useState(sections[0])
  const [selectedTopN, setSelectedTopN] = useState(topNOptions[0])

  return (
    <main className='container mx-auto'>
      <div className="flex flex-row flex-wrap my-2 p-2 font-mono text-orange-400 font-semibold outline outline-4 outline-orange-400">
        <div className="flex flex-row basis-1/2 justify-evenly">
          <div className="basis-4/5 tracking-wider justify-evenly">news.ycombinator.com</div>
          <div className="flex flex-row basis-1/5 justify-evenly">
            {topNOptions.map(option => (
              <Fragment key={`option-${option}`}>
                {
                  selectedTopN === option &&
                  <button className="text-white bg-orange-400" onClick={() => setSelectedTopN(option)}>
                    {option}
                  </button>
                }
                {
                  selectedTopN !== option &&
                  <button onClick={() => setSelectedTopN(option)}>
                    {option}
                  </button>
                }
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-4 basis-1/2 justify-evenly">
          {
            sections.map((section) => (
              <div className="flex-auto" key={section.sectionName}>
                {
                  selectedSection === section &&
                  <button className="text-white bg-orange-400" onClick={() => setSelectedSection(section)}>
                    {section.sectionName}
                  </button>
                }
                {
                  selectedSection !== section &&
                  <button onClick={() => setSelectedSection(section)}>
                    {section.sectionName}
                  </button>
                }

              </div>
            ))
          }
        </div>
      </div>

      <Section section={selectedSection.sectionSlug} topN={selectedTopN} />
    </main>
  )
}

export default Home;