import { useState, useRef } from "react";
import Link from "next/link";

export default function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [IsDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!IsDropDownOpen);
  };

  const logout = () => {
    // Logout logic here
  };

  const userDataX = null; // Replace with actual user data
  const apiBaseUrl = "https://example.com"; // Replace with actual API base URL

  return (
    <header className="w-full max-h-max bg-lightbluemain py-2 flex items-center justify-center sticky z-[999]">
      <div className="w-full flex flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="flex justify-center items-center w-2/12 h-full">
          <Link href={"/"}>
            <img
              src="/images/Logo-blue.png"
              alt="logo-refinds-blue"
              className="logoimg h-12 w-auto mr-4"
            />
          </Link>
          <Link href={"/"}>
            <img
              src="/images/text-logosvg.svg"
              alt="logo-refinds-type"
              className="logotxt w-auto h-6 hidden md:inline"
            />
          </Link>
        </div>

        {/* Hamburger Menu Section */}
        <div className="relative flex items-center md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleHamburgerMenu}
          >
            <img
              src="/icons/menu.svg"
              alt="Menu"
              className="h-8 w-8"
            />
          </button>

          {isHamburgerOpen && (
            <div className="absolute top-full right-0 z-[1000] bg-white shadow-lg rounded-md p-4 w-64">
              <div className="flex flex-col space-y-4">
                {userDataX ? (
                  <>
                    <Link
                      href={"/post"}
                      className="flex items-center gap-2 bg-blue_btn px-4 py-2 rounded-lg hover:bg-blue_btn_hover hover:scale-105 transition"
                    >
                      <p className="text-black font-bold text-2xl">+</p>
                      <p className="text-white font-bold text-xl">Jual</p>
                    </Link>
                    <button onClick={toggleDropDown} className="flex items-center gap-2">
                      <img
                        src={`${apiBaseUrl}/${userDataX.url_foto_profil}`}
                        alt="Foto Profil"
                        className="h-12 w-12 rounded-full"
                      />
                      <span className="font-semibold">Profile</span>
                    </button>

                    {IsDropDownOpen && (
                      <div className="bg-lightbg p-4 rounded-md shadow-md">
                        <ul className="space-y-2 text-gray-700">
                          {userDataX.level_account === "admin" && (
                            <li>
                              <Link
                                href={"/admin_dashboard"}
                                className="flex items-center gap-2 hover:text-blue_btn"
                              >
                                <img src="/icons/sm/admin.svg" alt="Admin" />
                                Admin Dashboard
                              </Link>
                            </li>
                          )}
                          <li>
                            <Link
                              href={"/user_transaksi_penjualan"}
                              className="flex items-center gap-2 hover:text-blue_btn"
                            >
                              <img src="/icons/sm/acc_sm.svg" alt="" />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={"/user_setting"}
                              className="flex items-center gap-2 hover:text-blue_btn"
                            >
                              <img src="/icons/sm/setting.svg" alt="" />
                              Setting
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={logout}
                              className="flex items-center gap-2 text-red-500 hover:text-red-700"
                            >
                              <img src="/icons/sm/logout.svg" alt="Logout" />
                              Sign Out
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href={"/login"}
                      className="bg-blue_btn py-2 px-4 rounded-md text-white text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/register"}
                      className="bg-blue_btn py-2 px-4 rounded-md text-white text-center"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Desktop User Section */}
        <div className="hidden md:flex w-1/4 h-full text-white items-center space-x-2 px-2 justify-evenly">
          {userDataX ? (
            <>
              <Link
                href={"/post"}
                className="flex gap-2 bg-blue_btn px-6 py-1 rounded-lg hover:bg-blue_btn_hover hover:scale-105 transition"
              >
                <p className="text-black font-bold text-2xl">+</p>
                <p className="text-white font-bold text-xl">Jual</p>
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropDown} type="button">
                  <img
                    src={`${apiBaseUrl}/${userDataX.url_foto_profil}`}
                    alt="Foto Profil"
                    className="h-[48px] rounded-full hidden md:inline"
                  />
                </button>
                {IsDropDownOpen && (
                  <div className="absolute top-full right-0 z-[99] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700 bg-lightbg rounded-lg">
                      {userDataX.level_account === "admin" && (
                        <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                          <Link
                            href={"/admin_dashboard"}
                            className="flex gap-2"
                          >
                            <img src="/icons/sm/admin.svg" alt="" />
                            <p>Admin Dashboard</p>
                          </Link>
                        </li>
                      )}
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                        <Link
                          href={"/user_transaksi_penjualan"}
                          className="flex gap-2"
                        >
                          <img src="/icons/sm/acc_sm.svg" alt="" />
                          <p>Profile</p>
                        </Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg border-b-white border-b-2 hover:bg-lightbg_hover">
                        <Link href={"/user_setting"} className="flex gap-1">
                          <img src="/icons/sm/setting.svg" alt="" />
                          <p>Setting</p>
                        </Link>
                      </li>
                      <li className="w-full px-3 py-2 bg-lightbg hover:bg-lightbg_hover">
                        <button onClick={logout} className="flex gap-1">
                          <img src="/icons/sm/logout.svg" alt="" />
                          <p>Sign Out</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <Link
                href={"/login"}
                className="rounded-md bg-blue_btn py-2 px-4 text-sm text-white ml-2"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="rounded-md bg-blue_btn py-2 px-4 text-sm text-white ml-2"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
