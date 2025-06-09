import { useEffect, useState } from "react"
import axios from "axios"
import { IMAGE_URL, SKIP_SESSION_STORAGE } from "../../constants"
import Card from "../../components/Card"
import style from './style.module.css'

const Home = () => {
  const [skipList, setSkipList] = useState<Record<string, string>[]>([])
  useEffect(() => {
    const skipData = window.sessionStorage.getItem(SKIP_SESSION_STORAGE)
    if (!skipData) {
      axios.get('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
        .then((response) => {
          setSkipList(response.data as unknown as Record<string, string>[])
          window.sessionStorage.setItem(SKIP_SESSION_STORAGE, JSON.stringify(response.data))
        })
    } else {
      setSkipList(JSON.parse(skipData))
    }
  }, [])
  return(
    <div
      className={`w-full p-4`}
    >
      <div className={style['page-container']}>
      {
        skipList.map((data) => (
          <div
            key={data.id}
            className={style['card-container']}
          >
            <Card
              id={data.id}
              image={IMAGE_URL.replace('{{size}}', data.size)}
              desc={`Skip size ${data.size} yards`}
              title={`${data.size} Yard Skip`}
              subtitle={`${data['hire_period_days']} day hire period`}
              actionLabel="Select"
              onClick={(id) => console.log(id)}
            />
          </div>
        ))
      }
      </div>
    </div>
  )
}

export default Home