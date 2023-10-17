"use client"

import { Fragment, useState } from "react";
import { Section } from "./components/section";
import { sections, topNOptions } from "./const";

const Home = () => {
  const [selectedSection, setSelectedSection] = useState(sections[0])
  const [selectedTopN, setSelectedTopN] = useState(topNOptions[0])

  return (
    <main className='container mx-auto'>
      <div className="container px-6 pt-2 my-2 h-12 font-mono text-orange-400 font-semibold border-4 border-orange-400">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row">
            <div className="basis-4/5 tracking-wider">news.ycombinator.com</div>
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
          <div className="grid grid-flow-col-dense auto-cols-auto gap-4">
            {
              sections.map((section) => (
                <Fragment key={section.sectionName}>
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

                </Fragment>
              ))
            }
          </div>
        </div>
      </div>

      <Section section={selectedSection.sectionSlug} topN={selectedTopN} />
    </main>
  )
}

export default Home;