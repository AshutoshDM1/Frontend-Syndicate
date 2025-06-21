import { Button } from '~/components/ui/button';

const Dashboard = () => {
  return (
    <>
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Menu Items</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Menu Item 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img
                src="https://images.unsplash.com/photo-1530990457142-bb18a441c52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFuZ28lMjBDb2NvbnV0JTIwU21vb3RoaWUlMjBCb3dsfGVufDB8fDB8fHww"
                alt="Mango Coconut Smoothie Bowl"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Mango Coconut Smoothie Bowl</h3>
                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        Beverages
                      </span>
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">Dessert</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-orange-500">$9.00</span>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Refreshing and tropical smoothie bowl with a hint of coconut, topped with fresh
                  fruit. Perfect for a light meal or cool dessert.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < 4 ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        className={i === 4 ? 'fill-current text-gray-300' : ''}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.6 (85 reviews)</span>
                </div>
              </div>
            </div>

            {/* Menu Item 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img
                src="https://images.unsplash.com/photo-1504387828636-abeb50778c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                alt="Nuts Berries Oatmeal"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Nuts Berries Oatmeal</h3>
                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                      <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded">Dessert</span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-orange-500">$10.00</span>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Hearty oatmeal topped with a variety of nuts and fresh seasonal berries. A
                  nutritious breakfast to start your day.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < 5 ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.7 (62 reviews)</span>
                </div>
              </div>
            </div>

            {/* Menu Item 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img
                src="https://plus.unsplash.com/premium_photo-1695925105294-2e135f1e624b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R3JlZW4lMjBEZXRveCUyMEp1aWNlfGVufDB8fDB8fHww"
                alt="Green Detox Juice"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Green Detox Juice</h3>
                    <div className="flex gap-2 text-xs text-gray-500 mt-1">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        Beverages
                      </span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-orange-500">$7.00</span>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Refreshing blend of kale, cucumber, celery, apple, and lemon. A perfect cleansing
                  drink packed with nutrients.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={i < 4 ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        className={i >= 4 ? 'fill-current text-gray-300' : ''}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.2 (48 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Overview Section with Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8 hidden">
          <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
          <p className="text-sm text-gray-500 mb-4">This Week</p>

          <div className="flex items-end h-48 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              // Generate random heights for the chart bars
              const height = 30 + Math.floor(Math.random() * 70);
              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-orange-500 rounded-t-md"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2">{day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
            <div className="text-3xl font-bold">352</div>
            <div className="text-green-500 text-sm mt-2">↑ 18% from last week</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Revenue</h3>
            <div className="text-3xl font-bold">$4,532</div>
            <div className="text-green-500 text-sm mt-2">↑ 12% from last week</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Total Customers</h3>
            <div className="text-3xl font-bold">290</div>
            <div className="text-green-500 text-sm mt-2">↑ 9% from last week</div>
          </div>
        </div>

        {/*  Orders */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Button
              variant="outline"
              className="text-orange-500 border-orange-500 hover:bg-orange-50"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Order Card 1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Order #2543</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    Completed
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                    alt="Food item"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">Healthy Salad Bowl</h4>
                    <p className="text-sm text-gray-600">2 items • $24.00</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-3">Ordered 35 minutes ago</div>
              </div>
            </div>

            {/* Order Card 2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">Order #2542</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    In Progress
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                    alt="Food item"
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">Margherita Pizza</h4>
                    <p className="text-sm text-gray-600">3 items • $32.50</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-3">Ordered 55 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
