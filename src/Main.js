import './styles/Main.css'
import React from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Main() {
  const [prefectures, setPrefectures] = React.useState([])
  const [chartData, setChartData] = React.useState({ prefs: [], data: [] })
  const baseURL = 'https://opendata.resas-portal.go.jp'

  React.useEffect(() => {
    axios
      .get(baseURL + '/api/v1/prefectures', {
        headers: {
          'X-API-KEY	': process.env.REACT_APP_API_KEY,
        },
      })
      .then((res) => {
        if (res?.data?.result?.length > 0) {
          setPrefectures(res?.data?.result)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  if (!prefectures) return null
  const handleChange = (data) => {
    const target = prefectures.find((elm) => {
      return elm?.prefCode === Number(data.target.id)
    })
    axios
      .get(`${baseURL}/api/v1/population/composition/perYear`, {
        headers: {
          'X-API-KEY	': process.env.REACT_APP_API_KEY,
        },
        params: {
          prefCode: target.prefCode,
        },
      })
      .then((res) => {
        const result = res?.data?.result?.data.find((elm) => elm?.label === '総人口')?.data || []
        const update_data = [...chartData.data]
        let update_prefs = [...chartData.prefs]

        if (update_prefs.find((elm) => elm === target.prefName)) {
          update_data.map((elm) => {
            const num = result.find((res) => res?.year === elm.year)
            elm[target.prefName] = num
            return elm
          })
          update_prefs = update_prefs.filter((elm) => elm !== target.prefName)
        } else {
          for (let i of result) {
            if (update_data.find((elm) => elm?.year === i.year)) {
              const target_data = update_data.findIndex((elm) => elm?.year === i.year)
              update_data[target_data][target.prefName] = i.value
            } else {
              update_data.push({ year: i.year, [target.prefName]: i.value })
            }
          }
          update_prefs.push(target.prefName)
        }
        setChartData({ prefs: update_prefs, data: update_data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <header className="title">RESAS</header>
      <section className="container">
        <div className="selector">
          <div className="selector-title">都道府県</div>
          <ul className="selector-list">
            {prefectures.map((state, i) => {
              return (
                <li key={i} className="selector-list-item">
                  <p>
                    <label htmlFor={`checkbox-${state.prefName}`}>{state.prefName}</label>
                    <input
                      id={state.prefCode}
                      name={state.prefName}
                      type="checkbox"
                      onChange={handleChange}
                    />
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="chart-container">
          <LineChart
            width={800}
            height={800}
            margin={{ right: 50, left: 50 }}
            data={chartData.data}
          >
            {chartData.prefs.map((elm, index) => {
              return <Line key={index} type="monotone" dataKey={elm} stroke="#8884d8" />
            })}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
      </section>
    </div>
  )
}

export default Main
