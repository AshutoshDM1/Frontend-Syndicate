import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Coffee,
  Utensils,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const MainDashboard = () => {
  const statsCards = [
    {
      title: 'Total Orders',
      value: '48,652',
      change: '1.58%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Customer',
      value: '1248',
      change: '0.42%',
      trend: 'down',
      icon: Users,
      color: 'bg-orange-500',
    },
    {
      title: 'Total Revenue',
      value: '$215,860',
      change: '2.36%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-orange-500',
    },
  ];

  const topCategories = [
    { name: 'Seafood', percentage: 30, color: 'bg-orange-500' },
    { name: 'Beverages', percentage: 25, color: 'bg-gray-600' },
    { name: 'Dessert', percentage: 25, color: 'bg-gray-700' },
    { name: 'Pasta', percentage: 20, color: 'bg-gray-300' },
  ];

  const orderTypes = [
    {
      name: 'Dine-In',
      percentage: 45,
      count: 900,
      icon: Utensils,
      color: 'bg-gray-700',
    },
    {
      name: 'Takeaway',
      percentage: 30,
      count: 600,
      icon: Coffee,
      color: 'bg-gray-600',
    },
    {
      name: 'Online',
      percentage: 25,
      count: 500,
      icon: ShoppingCart,
      color: 'bg-gray-500',
    },
  ];

  const weeklyOrders = [
    { day: 'Mon', orders: 140 },
    { day: 'Tue', orders: 142 },
    { day: 'Wed', orders: 155 },
    { day: 'Thu', orders: 185 },
    { day: 'Fri', orders: 165 },
    { day: 'Sat', orders: 148 },
    { day: 'Sun', orders: 150 },
  ];

  // Chart data for revenue over time
  const revenueData = [
    { month: 'Mar', income: 10000, expense: 6000 },
    { month: 'Apr', income: 9500, expense: 5500 },
    { month: 'May', income: 11000, expense: 8500 },
    { month: 'Jun', income: 8000, expense: 7000 },
    { month: 'Jul', income: 16580, expense: 7500 },
    { month: 'Aug', income: 10000, expense: 3000 },
    { month: 'Sep', income: 14000, expense: 6000 },
    { month: 'Oct', income: 18000, expense: 5000 },
  ];

  // Chart configurations
  const revenueChartConfig = {
    income: {
      label: 'Income',
      color: '#f97316',
    },
    expense: {
      label: 'Expense',
      color: '#6b7280',
    },
  };

  const categoryChartConfig = {
    seafood: {
      label: 'Seafood',
      color: '#f97316',
    },
    beverages: {
      label: 'Beverages',
      color: '#4b5563',
    },
    dessert: {
      label: 'Dessert',
      color: '#374151',
    },
    pasta: {
      label: 'Pasta',
      color: '#d1d5db',
    },
  };

  const categoryData = [
    { name: 'Seafood', value: 30, fill: '#f97316' },
    { name: 'Beverages', value: 25, fill: '#4b5563' },
    { name: 'Dessert', value: 25, fill: '#374151' },
    { name: 'Pasta', value: 20, fill: '#d1d5db' },
  ];

  const ordersChartConfig = {
    orders: {
      label: 'Orders',
      color: '#f97316',
    },
  };
  return (
    <>
      <div className="p-6 space-y-6 min-h-screen">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="bg-card shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary p-3 rounded-lg">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="bg-card shadow-sm py-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-card-foreground">
                    Total Revenue
                  </CardTitle>
                  <p className="text-2xl font-bold text-card-foreground mt-1">$184,839</p>
                </div>
                <Select defaultValue="8months">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8months">Last 8 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig} className="h-64 w-full">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6b7280" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeOpacity={0} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [
                      `$${Number(value).toLocaleString()}`,
                      name === 'income' ? 'Income' : 'Expense',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="url(#incomeGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#6b7280"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card className="bg-card shadow-sm py-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Top Categories
                </CardTitle>
                <Select defaultValue="thismonth">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thismonth">This Month</SelectItem>
                    <SelectItem value="lastmonth">Last Month</SelectItem>
                    <SelectItem value="thisquarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={categoryChartConfig} className="h-64">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                </PieChart>
              </ChartContainer>

              {/* Categories List */}
              <div className="space-y-3 mt-4">
                {topCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${category.color === 'bg-orange-500' ? 'bg-primary' : category.color}`}
                      ></div>
                      <span className="text-sm font-medium text-card-foreground">
                        {category.name}
                      </span>
                      <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Overview */}
          <Card className="bg-card shadow-sm py-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Orders Overview
                </CardTitle>
                <Select defaultValue="thisweek">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thisweek">This Week</SelectItem>
                    <SelectItem value="lastweek">Last Week</SelectItem>
                    <SelectItem value="thismonth">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={ordersChartConfig} className="h-64 w-full">
                <BarChart data={weeklyOrders}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" strokeOpacity={0} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`${value} orders`, 'Orders']}
                  />
                  <Bar dataKey="orders" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Order Types */}
          <Card className="bg-card shadow-sm py-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-card-foreground">
                  Order Types
                </CardTitle>
                <Select defaultValue="thismonth">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thismonth">This Month</SelectItem>
                    <SelectItem value="lastmonth">Last Month</SelectItem>
                    <SelectItem value="thisquarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderTypes.map((type, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <type.icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-card-foreground">
                          {type.name}
                        </span>
                        <span className="text-sm text-muted-foreground">{type.percentage}%</span>
                      </div>
                      <span className="text-lg font-semibold text-card-foreground">
                        {type.count}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
