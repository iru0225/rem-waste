import { useEffect, useState } from "react"
import axios from "axios"
import { FILTER_PILL_LABEL, FILTERS_CHECKBOX, FILTERS_PILL, IMAGE_URL, SKIP_SESSION_STORAGE } from "../../constants"
import Card from "../../components/Card"
import style from './style.module.css'
import Checkbox from "../../components/Checkbox"
import PillButton from "../../components/PillButton"
import Button from "../../components/Button"

const Home = () => {
  const [skipList, setSkipList] = useState<Record<string, string>[]>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [applyFilter, setApplyFilter] = useState<Record<string, string | boolean>[]>([])
  const [selectedItem, setSelectedItem] = useState('')
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

  const handleChange = (e: React.SyntheticEvent) => {
    const { name, checked } = e.currentTarget as HTMLInputElement
    setApplyFilter(prevState => {
      const isAvailable = prevState.find(({id}) => id === name)
      if (!isAvailable && checked) {
        return [
          ...prevState,
          {
            id: name,
            label: FILTER_PILL_LABEL[name]
          }
        ]
      }

      return prevState.filter(({id}) => id !== name)
    })
  }

  const handleClick = (_data: string, value: string) => {
    setApplyFilter(prevState => {
      const isAvailable = prevState.find(({label}) => label === value)
      if (!isAvailable) {
        const newState = prevState.filter(({id}) => id !== 'size')
        return [
          ...newState,
          {
            id: 'size',
            label: value
          }
        ]
      }
      
      return prevState.filter(({label}) => label !== value)
    })
  }

  const filterData = (arrData: Record<string, string | boolean>[], filter: Record<string, string | boolean>[]) => {
    if (filter.length > 0) {
       let newState = [...arrData]
      const filterKey = [...filter].reduce((acc, curr) => {
        if (curr.id === 'size') {
          acc['size'] = curr.label
        }
        if (curr.id === 'heavyWaste') {
          acc['allows_heavy_waste'] = true
        }
        if (curr.id === 'onRoad') {
          acc['allowed_on_road'] = true
        }
        return acc
      }, {})

      Object.keys(filterKey).forEach(key => {
        if (key === 'size') {
          const data = (filterKey[key] as string).includes('>') ? (filterKey[key] as string).split('> ') : (filterKey[key] as string).split(' ~ ')
          newState = newState.filter((state) => {
            if (data.length > 1) {
              return state[key] >= data[0] && state[key] <= data[1]
            }
            return state[key] > data[0]
          })
        }

        if (key === 'allows_heavy_waste' || key === 'allowed_on_road') {
          newState = newState.filter(data => !!data[key])
        }
      })

      return newState
    }

    return arrData
  }

  return(
    <div
      className={`w-full p-4 flex relative`}
    >
      <div className={`${style['filter-container']} ${openFilter ? style['open'] : ''}`}>
        <button onClick={() => setOpenFilter(false)} className={style['close-button']}>X</button>
        <h2>Filter</h2>
        <section>
          {
            FILTERS_CHECKBOX.map(data => (
              <Checkbox
                key={`filter-${data.name}`}
                id={data.name}
                name={data.name}
                label={data.label}
                onChange={handleChange}
              />
            ))
          }
        </section>
        <section>
          <h3>Size</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}
          >
            {
              FILTERS_PILL.map(data => (
                <PillButton
                  key={`filter-${data.name}`}
                  id={data.name}
                  label={data.label}
                  onClick={handleClick}
                  isSelected={!!applyFilter.find(({label}) => label === data.label)}
                />
              ))
            }
          </div>
        </section>
      </div>
      <div
        className="flex flex-col gap-2 w-full relative"
      >
        <div
          className={style['open-filter']}
        >
          <Button
            id="open-filter"
            type="button"
            variant="primary"
            onClick={() => setOpenFilter(true)}
          >
            Open Filter
          </Button>
        </div>
        {
          applyFilter.length > 0 && (
            <div className="p-4 flex gap-2 justify-center overflow-hidden overflow-x-auto">
              {
                applyFilter.map(data => (
                  <span
                    key={`apply-filter-${data.label}`}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid var(--color-primary-700)',
                      borderRadius: '2.5rem'
                    }}
                  >
                    {data.label}
                  </span>
                ))
              }
            </div>
          )
        }
        <div className={style['page-container']}>
          {
            filterData(skipList, applyFilter).map((data) => (
              <div
                key={data.id as string}
                className={style['card-container']}
              >
                <Card
                  id={data.id as string}
                  image={IMAGE_URL.replace('{{size}}', data.size as string)}
                  desc={`Skip size ${data.size} yards`}
                  title={`${data.size} Yard Skip`}
                  subtitle={`${data['hire_period_days']} day hire period`}
                  actionLabel={selectedItem === data.id ? 'Unselect' : 'Select'}
                  price={Number(data['price_before_vat'])}
                  heavyWaste={!!data['allows_heavy_waste']}
                  onRoad={!!data['allowed_on_road']}
                  vat={Number(data.vat)}
                  isSelected={selectedItem === data.id}
                  onClick={(id) => {
                    if (selectedItem === id) {
                      setSelectedItem('')
                    } else {
                      setSelectedItem(id)
                    }
                  }}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home