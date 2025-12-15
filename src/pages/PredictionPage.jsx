import { useState } from 'react';
import { Card, Form, Input, DatePicker, Button, message, Spin, Alert } from 'antd';
import {  
  LoadingOutlined,
  DollarOutlined,
  StockOutlined,
  BulbOutlined
} from '@ant-design/icons';
import PredictionResults from '../components/PredictionResults';

const PredictionPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState(null);

  // Mock backend URL (replace with actual backend endpoint)
  const API_URL = 'https://api.example.com/predict';

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    
    try {
      // In production, replace with actual API call
      // const response = await axios.post(API_URL, values);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - Replace this with actual API response
      const mockResponse = {
        data: {
          symbol: values.symbol.toUpperCase(),
          input_date: values.date.format('YYYY-MM-DD'),
          input_close: parseFloat(values.close_price),
          predicted_price: (parseFloat(values.close_price) * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2),
          price_change: (Math.random() * 10 - 5).toFixed(2),
          percent_change: (Math.random() * 5 - 2.5).toFixed(2),
          prediction_date: values.date.format('YYYY-MM-DD'),
          next_day_date: values.date.add(1, 'day').format('YYYY-MM-DD'),
          confidence: (0.7 + Math.random() * 0.3).toFixed(3),
          model_used: "Logistic Regression (News-Augmented)",
          recommendation: Math.random() > 0.5 ? "BUY" : "SELL",
          insights: {
            volatility: (Math.random() * 3).toFixed(2),
            support_level: (parseFloat(values.close_price) * 0.95).toFixed(2),
            resistance_level: (parseFloat(values.close_price) * 1.05).toFixed(2),
            position_relative_to_average: Math.random() > 0.5 ? "Above 50-Day MA" : "Below 50-Day MA"
          }
        }
      };
      
      setPredictionData(mockResponse.data);
      message.success('Prediction generated successfully!');
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Failed to generate prediction. Please try again.');
      message.error('Prediction failed!');
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
    setPredictionData(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          AI Stock Price Predictor
        </h1>
        <p className="text-lg text-gray-600">
          Enter stock details to get AI-powered price predictions and insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form Section */}
        <div className="lg:col-span-2">
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <StockOutlined className="text-blue-600" />
                <span className="text-xl font-semibold">Stock Prediction Input</span>
              </div>
            }
            className="shadow-lg border-0"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="Stock Symbol"
                  name="symbol"
                  rules={[
                    { required: true, message: 'Please enter stock symbol!' },
                    { pattern: /^[A-Za-z]{1,5}$/, message: 'Invalid stock symbol!' }
                  ]}
                >
                  <Input 
                    placeholder="e.g., AAPL, GOOGL, MSFT" 
                    size="large"
                    prefix={<StockOutlined className="text-gray-400" />}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label="Close Price ($)"
                  name="close_price"
                  rules={[
                    { required: true, message: 'Please enter close price!' },
                    { pattern: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format!' }
                  ]}
                >
                  <Input 
                    placeholder="e.g., 168.00" 
                    size="large"
                    prefix={<DollarOutlined className="text-gray-400" />}
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: 'Please select date!' }]}
                >
                  <DatePicker 
                    size="large" 
                    className="w-full rounded-lg"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </div>

              {error && (
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  className="rounded-lg"
                />
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  size="large" 
                  onClick={onReset}
                  className="rounded-lg px-8"
                >
                  Clear
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large"
                  loading={loading}
                  icon={loading ? <LoadingOutlined /> : <BulbOutlined />}
                  className="rounded-lg px-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-none hover:from-blue-700 hover:to-indigo-700"
                >
                  {loading ? 'Predicting...' : 'Generate Prediction'}
                </Button>
              </div>
            </Form>
          </Card>
        </div>

        {/* Quick Info Section */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <BulbOutlined className="mr-2 text-blue-600" />
              How It Works
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Enter stock symbol and latest close price</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>AI analyzes historical patterns and market data</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Get detailed prediction with confidence score</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Receive actionable trading insights</span>
              </li>
            </ul>
          </Card>

          {loading && (
            <Card className="shadow-lg border-0 text-center">
              <Spin 
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
                size="large"
              />
              <p className="mt-4 text-gray-600">AI is analyzing market data...</p>
            </Card>
          )}
        </div>
      </div>

      {/* Prediction Results */}
      {predictionData && (
        <div className="mt-8 animate-slide-up">
          <PredictionResults data={predictionData} />
        </div>
      )}
    </div>
  );
};

export default PredictionPage;