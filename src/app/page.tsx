"use client"

import { Fragment, useCallback, useEffect, useState } from "react"
import { Section } from "@/components/section"
import { fragmentMarker, sections, topNOptions } from "@/const"
import { useRouter } from 'next/navigation'
import { useLocationHash } from "@/hooks"

const Home = () => {
  const router = useRouter()
  const location = useLocationHash()

  const [selectedSection, __setSelectedSection] = useState(sections[0])

  const setSelectedSection = useCallback((section: any) => {
    router.push(`${fragmentMarker}${section.sectionName}`)
    __setSelectedSection(section)
  }, [router])


  useEffect(() => {
    const fragmentPath = location.split(fragmentMarker).at(1) || sections[0].sectionName
    const selectionFromFragmentPath = sections.filter((section) => section.sectionName === fragmentPath).at(0) || sections[0]

    selectionFromFragmentPath && setSelectedSection(selectionFromFragmentPath)
  }, [location, setSelectedSection])

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
              <div key={section.sectionName} className="px-0.5">
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