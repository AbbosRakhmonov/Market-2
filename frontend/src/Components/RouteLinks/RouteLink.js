import React from 'react';
import {
  IoAttach,
  IoBagCheck,
  IoCloudDone,
  IoDocumentText,
} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

export const RouteLink = ({ path, title, iconType }) => {
  const setActive = ({ isActive }) =>
    isActive ? `activelink linkstyles` : `linkstyles`;

  const iconTypes = {
    bag: <IoBagCheck size={24} color='#12B76A' />,
    cloud: <IoCloudDone size={24} color='#F04438' />,
    clip: <IoAttach size={24} color='#F79009' />,
    text: <IoDocumentText size={24} color='#00B4CC' />,
  };
  return (
    <NavLink to={path} className={setActive}>
      {iconTypes[iconType]}
      <span className='text-base text-black-700'>{title}</span>
    </NavLink>
  );
};

// bg-white-900 shadow-[0px_10px_10px_rgba(0, 0, 0, 0.05)]
