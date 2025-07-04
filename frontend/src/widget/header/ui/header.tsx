import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full">
      <div className="header-wrapper max-w-[1440px] w-full mx-auto flex items-center justify-between py-4 px-5">
        <div className="header-logo"></div>
        <nav>
          <ul className="flex items-center gap-3">
            <li>
              <Link href="/create-post"></Link>
            </li>
            <li>
              <Link href="/my-posts"></Link>
            </li>
          </ul>
        </nav>
        <Link href="/sign-in"></Link>
      </div>
    </header>
  );
};

export default Header;
