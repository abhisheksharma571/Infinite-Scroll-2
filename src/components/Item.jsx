import React from 'react';

const Item = React.forwardRef(({ item }, ref) => {
  return (
    <div ref={ref} className="p-4 bg-white shadow rounded-lg mb-4 flex flex-col items-center " >
      <img src={item.urls.regular} alt={item.alt_description} className="w-auto h-140 rounded mx-auto" />
      <p>{item.alt_description}</p>
    </div>
  );
});

export default Item;
