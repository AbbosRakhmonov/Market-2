import {NavLink} from 'react-router-dom';
import AccordionLink from "./AccordionLink";

function NavbarLink(
    {
        path,
        label,
        icon,
        id,
        submenu,
        handleClickFirstMenu,
        activeFirstSubMenuId,
        activeSecondSubMenuId,
        handleClickSecondMenu,
        expanded
    }
) {
    const navLinkClasses = ({isActive}) => {
        return `navbar__link flex items-center ${expanded ? "justify-center" : ""} px-[0.9375rem] py-[0.625rem] gap-[0.9375rem] rounded-[1.875rem] transition ease-in-out duration-200 ${isActive ? "text-white-900 bg-primary-800" : "text-black-700 hover:bg-black-100"}`;
    }
    const handleClickNavLink = () => {
        handleClickSecondMenu(null);
        handleClickFirstMenu(null)
    }
    return (
        <div className={'mb-[0.9375rem]'}>
            {
                submenu ?
                    <AccordionLink
                        submenu={submenu}
                        expanded={expanded}
                        id={id}
                        path={path}
                        label={label}
                        handleClickFirstMenu={handleClickFirstMenu}
                        activeFirstSubMenuId={activeFirstSubMenuId}
                        icon={icon}
                        activeSecondSubMenuId={activeSecondSubMenuId}
                        handleClickSecondMenu={handleClickSecondMenu}/>
                    :
                    <NavLink to={path} onClick={handleClickNavLink} className={navLinkClasses}>
                        {icon && <span className={`nav-link__icon`}>{icon}</span>}
                        {!expanded && <span className="nav-link__label text-base leading-[1.1875rem]">{label}</span>}
                    </NavLink>
            }
        </div>
    );
}

export default NavbarLink;