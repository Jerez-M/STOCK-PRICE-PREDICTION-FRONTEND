import { useState } from 'react';
import { Card, Row, Col, Typography, Steps, Divider, Alert, Tag, Button, List, Collapse, Space } from 'antd';
import {
  HomeOutlined,
  BulbOutlined,
  LineChartOutlined,
  SearchOutlined,
  RocketOutlined,
  BarChartOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  BookOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  ThunderboltOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

const DocumentationPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Getting Started',
      icon: <RocketOutlined />,
      content: 'Welcome to StockPredict.AI! This guide will help you navigate the platform.'
    },
    {
      title: 'Dashboard',
      icon: <HomeOutlined />,
      content: 'Understand the market overview and key metrics.'
    },
    {
      title: 'AI Predictions',
      icon: <BulbOutlined />,
      content: 'Learn how to use our AI-powered prediction system.'
    },
    {
      title: 'Stock Analysis',
      icon: <LineChartOutlined />,
      content: 'Master technical analysis and chart interpretation.'
    }
  ];

  const navigationGuide = [
    {
      title: 'Home Dashboard',
      path: '/',
      icon: <HomeOutlined />,
      description: 'Your starting point with market overview',
      features: [
        'Live market indices',
        'Candlestick charts',
        'Top performing stocks',
        'Market news'
      ]
    },
    {
      title: 'AI Predictor',
      path: '/predict',
      icon: <BulbOutlined />,
      description: 'Generate AI-powered stock predictions',
      features: [
        'Enter stock details',
        'Get price predictions',
        'View confidence scores',
        'Receive trading recommendations'
      ]
    },
    {
      title: 'Stock Analysis',
      path: '/stock/AAPL',
      icon: <LineChartOutlined />,
      description: 'Detailed technical analysis for any stock',
      features: [
        'Interactive charts',
        'Technical indicators',
        'Price history',
        'Volume analysis'
      ]
    }
  ];

  const predictionSteps = [
    {
      step: 1,
      title: 'Select Stock Symbol',
      description: 'Enter the stock ticker symbol (e.g., AAPL, TSLA, GOOGL)',
      tip: 'Use the search bar in the navigation to quickly find stocks'
    },
    {
      step: 2,
      title: 'Enter Current Details',
      description: 'Provide the current price and date for accurate predictions',
      tip: 'Use recent closing prices for best results'
    },
    {
      step: 3,
      title: 'Generate Prediction',
      description: 'Click "Generate Prediction" to run the AI model',
      tip: 'Our model uses historical data and market patterns'
    },
    {
      step: 4,
      title: 'Interpret Results',
      description: 'Review the prediction, confidence score, and recommendations',
      tip: 'Look at both price prediction and confidence level'
    }
  ];

  const chartInterpretation = [
    {
      chart: 'Candlestick Charts',
      purpose: 'Show price movement over time',
      elements: [
        'Green candle = Price increased',
        'Red candle = Price decreased',
        'Wick length = Price volatility',
        'Body size = Price range'
      ]
    },
    {
      chart: 'Volume Charts',
      purpose: 'Show trading activity',
      elements: [
        'High volume = Strong interest',
        'Low volume = Weak interest',
        'Volume spikes = Important events',
        'Trend confirmation'
      ]
    },
    {
      chart: 'Technical Indicators',
      purpose: 'Predict future price movements',
      elements: [
        'Moving Averages = Trend direction',
        'RSI = Overbought/Oversold',
        'MACD = Momentum changes',
        'Bollinger Bands = Volatility'
      ]
    }
  ];

  const tipsAndBestPractices = [
    'Always verify AI predictions with multiple sources',
    'Start with well-known stocks before exploring others',
    'Pay attention to market news and events',
    'Consider both technical and fundamental analysis',
    'Set realistic expectations for predictions',
    'Use predictions as guidance, not absolute certainty'
  ];

  const faqs = [
    {
      question: 'How accurate are the AI predictions?',
      answer: 'Our AI model achieves 92.4% accuracy based on historical backtesting. However, all predictions should be used as guidance and verified with additional analysis.'
    },
    {
      question: 'What timeframes do you support?',
      answer: 'We support daily, weekly, and monthly timeframes for analysis. Predictions are typically for 1-5 day horizons.'
    },
    {
      question: 'Can I analyze any stock?',
      answer: 'Yes! We support over 5,000+ stocks and ETFs. Use the search function to find any publicly traded company.'
    },
    {
      question: 'Is real-time data available?',
      answer: 'Yes, we provide real-time market data during trading hours with 15-minute delays for free accounts.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-6 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-full text-blue-600 text-sm font-semibold backdrop-blur-sm">
            <BookOutlined className="mr-2" />
            USER GUIDE & DOCUMENTATION
          </div>
          
          <Title level={1} className="!text-4xl lg:!text-5xl !font-bold !mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              StockPredict.AI Documentation
            </span>
          </Title>
          
          <Paragraph className="!text-lg !text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to help you navigate our platform, understand our tools,
            and make informed trading decisions using AI-powered insights.
          </Paragraph>
        </div>

        {/* Quick Start Guide */}
        <Card className="rounded-2xl border-0 shadow-xl mb-8 bg-gradient-to-br from-white to-blue-50/50">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow">
              <RocketOutlined className="text-2xl text-white" />
            </div>
            <div>
              <Title level={2} className="!mb-0">Quick Start Guide</Title>
              <Text type="secondary">Get started in 4 simple steps</Text>
            </div>
          </div>

          <Steps current={activeStep} onChange={setActiveStep} className="mb-8">
            {steps.map((step, index) => (
              <Step 
                key={index} 
                title={step.title} 
                icon={step.icon}
                description={step.content}
              />
            ))}
          </Steps>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <Title level={3} className="!mb-4">
              {steps[activeStep]?.title} Instructions
            </Title>
            <Paragraph className="!text-gray-700">
              {steps[activeStep]?.content}
            </Paragraph>
            
            <div className="mt-6">
              <Button 
                type="primary" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 border-none"
                onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                icon={<ArrowRightOutlined />}
              >
                Next Step
              </Button>
            </div>
          </div>
        </Card>

        {/* Platform Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
                <HomeOutlined className="text-2xl text-white" />
              </div>
              <div>
                <Title level={2} className="!mb-0">Platform Navigation</Title>
                <Text type="secondary">Understanding the main sections</Text>
              </div>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            {navigationGuide.map((section, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <Link to={section.path}>
                  <Card 
                    className="rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full bg-gradient-to-br from-white to-gray-50"
                    hoverable
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        index === 0 ? 'bg-blue-100' : 
                        index === 1 ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        <div className={`${
                          index === 0 ? 'text-blue-600' : 
                          index === 1 ? 'text-purple-600' : 'text-green-600'
                        }`}>
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <Title level={4} className="!mb-0">{section.title}</Title>
                        <Text type="secondary" className="text-sm">{section.description}</Text>
                      </div>
                    </div>
                    
                    <Divider className="my-4" />
                    
                    <List
                      size="small"
                      dataSource={section.features}
                      renderItem={item => (
                        <List.Item className="!px-0 !py-2 border-0">
                          <div className="flex items-center space-x-2">
                            <CheckCircleOutlined className="text-green-500 text-sm" />
                            <Text className="text-gray-700">{item}</Text>
                          </div>
                        </List.Item>
                      )}
                    />
                    
                    <div className="mt-6">
                      <Button 
                        type="link" 
                        className="p-0 text-blue-600 hover:text-blue-700"
                        icon={<ArrowRightOutlined />}
                      >
                        Go to {section.title}
                      </Button>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        {/* Two Column Layout for Prediction & Analysis */}
        <Row gutter={[24, 24]} className="mb-12">
          {/* AI Prediction Guide */}
          <Col xs={24} lg={12}>
            <Card className="rounded-xl border-0 shadow-xl h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow">
                  <ThunderboltOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0">AI Prediction Guide</Title>
                  <Text type="secondary">Step-by-step instructions</Text>
                </div>
              </div>

              <div className="space-y-6">
                {predictionSteps.map((step, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Text strong className="text-white">{step.step}</Text>
                      </div>
                    </div>
                    <div className="flex-1">
                      <Title level={4} className="!mb-2">{step.title}</Title>
                      <Paragraph className="!text-gray-700 !mb-2">
                        {step.description}
                      </Paragraph>
                      <Alert
                        message="Tip"
                        description={step.tip}
                        type="info"
                        showIcon
                        icon={<InfoCircleOutlined />}
                        className="bg-blue-50 border-blue-200"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="flex items-center space-x-3 mb-3">
                  <BulbOutlined className="text-purple-600 text-xl" />
                  <Text strong className="text-gray-900">Pro Tip</Text>
                </div>
                <Paragraph className="!text-gray-700 !mb-0">
                  For best results, use the AI predictor during market hours with recent data. 
                  Combine AI predictions with your own research for optimal decision making.
                </Paragraph>
              </div>
            </Card>
          </Col>

          {/* Chart Interpretation Guide */}
          <Col xs={24} lg={12}>
            <Card className="rounded-xl border-0 shadow-xl h-full">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow">
                  <BarChartOutlined className="text-2xl text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0">Chart Interpretation</Title>
                  <Text type="secondary">Understanding technical analysis</Text>
                </div>
              </div>

              <Collapse ghost className="bg-transparent">
                {chartInterpretation.map((chart, index) => (
                  <Panel 
                    header={
                      <div className="flex items-center justify-between">
                        <Text strong className="text-gray-900">{chart.chart}</Text>
                        <Tag color="blue">{chart.purpose}</Tag>
                      </div>
                    } 
                    key={index}
                    className="!border-0 !bg-transparent"
                  >
                    <List
                      size="small"
                      dataSource={chart.elements}
                      renderItem={item => (
                        <List.Item className="!px-0 !py-2 border-0">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <Text className="text-gray-700">{item}</Text>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Panel>
                ))}
              </Collapse>

              <Divider className="my-6" />

              <div className="space-y-4">
                <Title level={4} className="!mb-4">Best Practices</Title>
                {tipsAndBestPractices.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <SafetyOutlined className="text-green-500 mt-1" />
                    <Text className="text-gray-700">{tip}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Card className="rounded-xl border-0 shadow-xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow">
              <QuestionCircleOutlined className="text-2xl text-white" />
            </div>
            <div>
              <Title level={2} className="!mb-0">Frequently Asked Questions</Title>
              <Text type="secondary">Common questions answered</Text>
            </div>
          </div>

          <Collapse ghost className="bg-transparent">
            {faqs.map((faq, index) => (
              <Panel 
                header={
                  <Text strong className="text-gray-900 text-lg">
                    {faq.question}
                  </Text>
                } 
                key={index}
                className="!mb-4 !border !border-gray-200 !rounded-xl hover:!border-blue-300 transition-colors"
              >
                <Paragraph className="!text-gray-700 !mb-0">
                  {faq.answer}
                </Paragraph>
              </Panel>
            ))}
          </Collapse>
        </Card>

        {/* Call to Action */}
        <div className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={16}>
              <Title level={2} className="!mb-4 !text-white">
                Ready to Start Trading Smarter?
              </Title>
              <Paragraph className="!text-blue-100 !mb-0">
                Now that you understand how to navigate our platform, 
                it's time to put your knowledge into practice. Start with 
                the AI predictor or explore detailed stock analysis.
              </Paragraph>
            </Col>
            <Col xs={24} lg={8}>
              <div className="flex flex-col space-y-3">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-none font-semibold"
                  onClick={() => window.location.href = '/predict'}
                  icon={<ThunderboltOutlined />}
                >
                  Try AI Predictor
                </Button>
                <Button 
                  size="large"
                  className="bg-transparent text-white hover:bg-white/10 border border-white/50 font-semibold"
                  onClick={() => window.location.href = '/stock/AAPL'}
                  icon={<EyeOutlined />}
                >
                  View Demo Analysis
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <Alert
            message="Important Notice"
            description="StockPredict.AI provides AI-powered insights for educational and informational purposes only. All investments involve risk, and past performance is not indicative of future results. Always conduct your own research and consider consulting with a qualified financial advisor before making investment decisions."
            type="warning"
            showIcon
            icon={<WarningOutlined />}
            className="rounded-xl border-orange-200 bg-orange-50"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;