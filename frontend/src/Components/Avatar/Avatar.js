function Avatar({avatar, alt, border = false, navbarExpended}) {
    return <>
        {
            border ? "" : (<div
                className={`avatar w-full flex items-center gap-[10px]`}>
                <div
                    className={`avatar-image transition-all linear duration-300 w-[50px] h-[50px] rounded-full overflow-hidden shadow-[0_10px_10px_rgba(0,0,0,0.15)]`}>
                    <img src={avatar} alt={alt || "avatar"} className={'pointer-events-none'}/>
                </div>
                <div className={`transition-all ease-in duration-200 avatar-info flex flex-col gap-[5px] ${navbarExpended ? "w-0 invisible opacity-0 ml-[10%]" : "opacity-100 visible w-max"}`}>
                    <h4 className={'text-black-900 font-medium'}>Abbos Rakhmonov</h4>
                    <p className={'text-black-700 text-xs leading-[14px]'}>Direktor</p>
                </div>
            </div>)
        }
    </>;
}

export default Avatar;