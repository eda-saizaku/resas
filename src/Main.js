import './styles/Main.css'
import React from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Main() {
  const [prefectures, setPrefectures] = React.useState(null)

  React.useEffect(() => {
    const baseURL = 'https://opendata.resas-portal.go.jp'
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
  const data = [
    { name: '1980', 東京: 200000, 神奈川: 250000 },
    { name: '1990', 東京: 400000, 神奈川: 500000 },
    { name: '2000', 東京: 450000, 神奈川: 560000 },
    { name: '2010', 東京: 700000, 神奈川: 900000 },
  ]
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
                      id={`checkbox-${state.prefName}`}
                      name={`checkbox-${state.prefName}`}
                      type="checkbox"
                    />
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="chart">
          <LineChart width={400} height={400} data={data}>
            <Line type="monotone" dataKey="東京" stroke="#8884d8" />
            <Line type="monotone" dataKey="神奈川" stroke="#322454" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
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
