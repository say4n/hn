export default async function Home() {
  const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
  const topstories: Array<string> = await response.json()

  return (
    <main className='container mx-auto'>
      <h1 className='font-mono text-orange-400 px-6 pt-2 my-2 h-12 font-semibold tracking-wider border-4 border-orange-400'>news.ycombinator.com</h1>

      <ul>
        {topstories.map(story => <li key={story}>{story}</li>)}
      </ul>
    </main>
  )
}
