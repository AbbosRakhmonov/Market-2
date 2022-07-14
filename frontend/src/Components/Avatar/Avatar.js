function Avatar({avatar, alt, border = false}) {
    return <>
        {
            border ? "" : (<div className={`avatar w-[3.125rem]`}>
                <img src={avatar} alt={alt || "avatar"} className={'w-full'}/>
                <div className="avatar-name">
                    <h4>Abbos Rakhmonov</h4>
                    <p>Direktor</p>
                </div>
            </div>)
        }
    </>;
}

export default Avatar;