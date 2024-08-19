function DashboardCards() {
  const cardsData = [
    {
      title: "Revenue",
      value: `10,000`,
      description: "Total revenue generated this month",
      type: "revenue",
    },
    {
      title: "Users",
      value: "1,200",
      description: "New users this month",
      type: "users",
    },
    {
      title: "Orders",
      value: "300",
      description: "Orders placed this month",
      type: "orders",
    },
    {
      title: "Products",
      value: "150",
      description: "Products sold this month",
      type: "products",
    },
    {
      title: "Feedback",
      value: "85%",
      description: "Positive feedback received",
      type: "feedback",
    },
    {
      title: "Subscriptions",
      value: "500",
      description: "New subscriptions this month",
      type: "subscriptions",
    },
  ];
  function getCardColor(type: string) {
    switch (type) {
      case "revenue":
        return "bg-[#3B82F6]";
      case "users":
        return "bg-[#10B981]";
      case "orders":
        return "bg-[#EF4444]";
      case "products":
        return "bg-[#F59E0B]";
      case "feedback":
        return "bg-[#8B5CF6]";
      case "subscriptions":
        return "bg-[#EC4899]";
      default:
        return "bg-[#6B7280]";
    }
  }
  return (
    <div className="">
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`px-[20px] py-[30px] flex justify-between items-center rounded-lg text-primary-white shadow-lg text-white ${getCardColor(
              card.type
            )}`}
          >
            <div>
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-sm font-playfair mt-[20px]">
                {card.description}
              </p>
            </div>
            <p className="text-[40px] font-bold">
              {card?.title === "Revenue" && "₦"}
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCards;
