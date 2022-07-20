import { useSelector } from 'react-redux';

function Avatar({ border = false, navbarExpended }) {
  const user = useSelector((state) => state.login.user);
  return (
    <>
      {border ? (
        ''
      ) : (
        <div className={`avatar w-full flex items-center gap-[10px]`}>
          <div
            className={`avatar-image flex items-center justify-center transition-all linear duration-300 w-[50px] h-[50px] rounded-full overflow-hidden shadow-[0_10px_10px_rgba(0,0,0,0.15)]`}
          >
            {user.image ? (
              <img
                src={user.image}
                alt={user.firstname}
                className={'pointer-events-none'}
              />
            ) : (
              `${
                user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()
              }`
            )}
          </div>
          <div
            className={`transition-all ease-in duration-200 avatar-info flex flex-col gap-[5px] ${
              navbarExpended
                ? 'w-0 invisible opacity-0 ml-[10%]'
                : 'opacity-100 visible w-max'
            }`}
          >
            <h4 className={'text-black-900 font-medium'}>
              {user.firstname} {user.lastname}
            </h4>
            <p className={'text-black-700 text-xs leading-[14px]'}>
              {user.type}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Avatar;
