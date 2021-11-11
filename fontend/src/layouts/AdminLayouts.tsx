import React from "react";
const AdminLayouts: React.FC = ({ children }) => {
  return (
    <div>
      <p>This is menu</p>
      {children}
    </div>
  );
};

export default AdminLayouts;
