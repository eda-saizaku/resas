import './styles/Main.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
const states = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県',
]
function Main() {
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
            {states.map((state, i) => {
              return (
                <li key={i} className="selector-list-item">
                  <p>
                    <label htmlFor={`checkbox-${state}`}>{state}</label>
                    <input id={`checkbox-${state}`} name={`checkbox-${state}`} type="checkbox" />
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
