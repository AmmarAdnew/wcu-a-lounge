import React from "react";
import MenuCard from "./MenuCard"; // Import the MenuCard component

const MenuSection = () => {
  const menuItems = [
    {
      imageUrl:
        "https://images.pexels.com/photos/196667/pexels-photo-196667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      title: "Best View in Newyork City",
      description: "The city that never sleeps",
      date: { day: "27", month: "March" },
      time: "6 mins ago",
      tag: "Photos",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      title: "Best Pizza in Town",
      description: "The collection of best pizza images in Newyork city",
      date: { day: "20", month: "March" },
      time: "3 mins read",
      tag: "Photos",
    },
    {
      imageUrl:
        "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      title: "Best Salad Images ever",
      description: "The collection of best salads of town in pictures",
      date: { day: "15", month: "April" },
      time: "6 mins read",
      tag: "Photos",
    },
  ];

  return (
    <div className="max-w-screen-xl mt-10 mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            date={item.date}
            time={item.time}
            tag={item.tag}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;