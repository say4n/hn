"use client"

import { Fragment, useState } from "react"
import { Section } from "@/components/section"
import { sections, topNOptions } from "@/const"

const Home = () => {
  const [selectedSection, setSelectedSection] = useState(sections[0])
  const [selectedTopN, setSelectedTopN] = useState(topNOptions[0])

  return (
    <main className='container mx-auto'>
      <nav className="flex flex-row justify-between flex-wrap m-2 p-1 font-mono text-orange-400 font-semibold outline outline-4 outline-orange-400">
        <div className="basis-2/5 tracking-wider justify-evenly outline outline-4 outline-orange-400 p-2 m-2">news.ycombinator.com</div>
        <div className="basis-1/5 flex flex-row justify-evenly outline outline-4 outline-orange-400 p-2 m-2">
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
        <div className="basis-1/5 flex flex-row justify-evenly outline outline-4 outline-orange-400 p-2 m-2">
          {
            sections.map((section) => (
              <div key={section.sectionName}>
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
      </nav>

      <div className="m-2">
        <Section section={selectedSection.sectionSlug} topN={selectedTopN} />
      </div>
    </main>
  )
}

export default Home;