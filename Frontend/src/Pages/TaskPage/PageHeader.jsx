import React from "react";
import { NavLink } from "react-router-dom";

function PageHeader() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <nav className="w-full bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <ul className="flex text-center gap-4 justify-center">
          <li>
            <NavLink to="/task/todos" className={linkClass}>
              Todos
            </NavLink>
          </li>

          <li>
            <NavLink to="/task/tasks" className={linkClass}>
              Tasks
            </NavLink>
          </li>

          <li>
            <NavLink to="/task/kan-ban" className={linkClass}>
              Kanban
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageHeader;
