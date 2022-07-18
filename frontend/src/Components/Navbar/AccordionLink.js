import {useEffect} from "react";
import {IoChevronDown} from "react-icons/io5";
import {NavLink, useLocation} from "react-router-dom";
import SubAccordionLink from "./SubAccordionLink";

function AccordionLink(
    {
        label,
        icon,
        submenu,
        id,
        path,
        handleClickFirstMenu,
        activeFirstSubMenuId,
        activeSecondSubMenuId,
        handleClickSecondMenu,
        expanded
    }) {
    const globalPath = useLocation().pathname.split("/").filter(item => item !== "");
    useEffect(() => {
      if (path.includes(globalPath[0])) {
        handleClickFirstMenu(id);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, id]);
    return (<>
        <button
            className={`navbar__link w-full flex items-center ${expanded ? "justify-center" : "justify-between"} px-[0.9375rem] py-[0.625rem] rounded-[1.875rem] transition ease-in-out duration-200 ${path.includes(globalPath[0]) ? "text-white-900 bg-primary-800" : "text-black-700 hover:bg-black-100"}`}
            onClick={() => handleClickFirstMenu(id)}>
                <span className="content flex items-center gap-[0.9375rem]">
                    {icon ? <span className={`nav-link__icon`}>{icon}</span> : ""}
                    {!expanded && <span className="nav-link__label text-base leading-[1.1875rem]">{label}</span>}
                </span>
            {!expanded && <IoChevronDown
                className={`transition ease-in-out duration-200 ${(activeFirstSubMenuId === id) ? 'rotate-180' : ""}`}
                size={"1.5rem"}/>}
        </button>
        <div
            className={`transition-all ease-in-out duration-300 pl-[1.875rem] flex flex-col gap-[0.625rem] overflow-hidden ${activeFirstSubMenuId === id ? 'max-h-screen opacity-100 mt-[0.625rem]' : 'max-h-0 opacity-0'}`}>
            {submenu.map(item => <div key={item.id}>
                {
                    item.submenu ?
                        <SubAccordionLink
                            id={item.id}
                            path={item.path}
                            globalPath={globalPath}
                            submenu={item.submenu}
                            label={item.label}
                            handleClickSecondMenu={handleClickSecondMenu}
                            activeSecondSubMenuId={activeSecondSubMenuId}
                        /> :
                        <NavLink to={item.path}
                                 onClick={(e) => handleClickSecondMenu(null)}
                                 className={({isActive}) => {
                                     return `flex items-center transition ease-in-out duration-100 py-[5px] px-[0.9375rem] rounded-[4px] border-b-[1px] ${isActive ? "bg-primary-700 text-white-900 border-primary-800" : "border-transparent text-black-700 hover:bg-black-100"}`;
                                 }}>
                        <span className={'text-base leading-[1.1875rem]'}>
                    {item.label}
                        </span>
                        </NavLink>
                }
            </div>)}
        </div>
    </>);
}

export default AccordionLink;