import React from 'react';
import {
  IoAttach,
  IoBagCheck,
  IoCloudDone,
  IoDocumentText,
} from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

export const RouteLink = ({ path, title, iconType }) => {
  const linkClass =
    'w-[180px] py-[0.3rem] rounded-full flex items-center justify-center gap-[0.625rem]';
  const setActive = ({ isActive }) =>
    isActive
      ? `bg-white-900 shadow-[0px_10px_10px] shadow-black-100 ${linkClass}`
      : `bg-inputHover ${linkClass}`;
  return (
    <NavLink to={`/maxsulotlar/qabul/${path}`} className={setActive}>
      {(iconType === 'bag' && <IoBagCheck size={24} color='#12B76A' />) ||
        (iconType === 'cloud' && <IoCloudDone size={24} color='#F04438' />) ||
        (iconType === 'clip' && <IoAttach size={24} color='#F79009' />) ||
        (iconType === 'text' && <IoDocumentText size={24} color='#00B4CC' />)}
      <span className='text-base text-black-700'>{title}</span>
    </NavLink>
  );
};

// bg-white-900 shadow-[0px_10px_10px_rgba(0, 0, 0, 0.05)]
