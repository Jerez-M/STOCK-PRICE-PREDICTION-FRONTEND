/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from 'recharts';
import { Card, Radio, Spin } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

const CandleStickChart = ({ symbol, timeframe }) => {
  const [chartType, setChartType] = useState('candle');
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Generate mock stock data
    const generateMockData = () => {
      const data = [];
      let basePrice = 150;
      const now = new Date();
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        
        const open = basePrice + (Math.random() * 10 - 5);
        const close = open + (Math.random() * 20 - 10);
        const high = Math.max(open, close) + Math.random() * 5;
        const low = Math.min(open, close) - Math.random() * 5;
        const volume = Math.floor(Math.random() * 1000000) + 500000;
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          open: parseFloat(open.toFixed(2)),
          close: parseFloat(close.toFixed(2)),
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          volume: volume,
          change: parseFloat((close - open).toFixed(2)),
          changePercent: parseFloat(((close - open) / open * 100).toFixed(2)),
        });
        
        basePrice = close;
      }
      
      return data;
    };
    
    setTimeout(() => {
      setChartData(generateMockData());
      setLoading(false);
    }, 800);
  }, [symbol, timeframe]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Open:</span>
              <span className="font-semibold">${data.open}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Close:</span>
              <span className={`font-semibold ${data.close >= data.open ? 'text-green-600' : 'text-red-600'}`}>
                ${data.close}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">High:</span>
              <span className="font-semibold">${data.high}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low:</span>
              <span className="font-semibold">${data.low}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Change:</span>
              <span className={`font-semibold ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.change >= 0 ? '+' : ''}{data.change} ({data.changePercent}%)
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex justify-between items-center">
        <Radio.Group 
          value={chartType} 
          onChange={(e) => setChartType(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="candle">Candlestick</Radio.Button>
          <Radio.Button value="line">Line Chart</Radio.Button>
          <Radio.Button value="area">Area Chart</Radio.Button>
        </Radio.Group>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center ${chartData[chartData.length - 1]?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {chartData[chartData.length - 1]?.change >= 0 ? 
              <RiseOutlined className="mr-1" /> : 
              <FallOutlined className="mr-1" />
            }
            <span className="font-semibold">
              {chartData[chartData.length - 1]?.change >= 0 ? '+' : ''}
              {chartData[chartData.length - 1]?.change} ({chartData[chartData.length - 1]?.changePercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Main Price Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                name="Close Price"
              />
            </LineChart>
          ) : chartType === 'area' ? (
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="close"
                stroke="#3b82f6"
                fill="url(#colorPrice)"
                strokeWidth={2}
                name="Close Price"
              />
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          ) : (
            // Candlestick-like chart using bar chart
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="close"
                name="Price Range"
                shape={(props) => {
                  // eslint-disable-next-line no-unused-vars
                  const { x, y, width, height, value, index } = props;
                  const dataPoint = chartData[index];
                  const isPositive = dataPoint.close >= dataPoint.open;
                  
                  return (
                    <g>
                      {/* High-Low line */}
                      <line
                        x1={x + width / 2}
                        y1={y}
                        x2={x + width / 2}
                        y2={y + height}
                        stroke={isPositive ? '#10b981' : '#ef4444'}
                        strokeWidth={1}
                      />
                      {/* Body */}
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={isPositive ? '#10b981' : '#ef4444'}
                        fillOpacity={0.8}
                      />
                    </g>
                  );
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip />
            <Bar
              dataKey="volume"
              name="Volume"
              fill="#94a3b8"
              radius={[2, 2, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`volume-cell-${index}`}
                  fill={entry.close >= entry.open ? '#86efac' : '#fca5a5'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CandleStickChart;