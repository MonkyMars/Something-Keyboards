import React from "react";
import Link from "next/link";
import styles from "../styles/components/Nav.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import GlobalContext from "../global/GlobalContext";
import { useSession } from "next-auth/react";

export default function Nav() {
  const { user, cart, cartCount } = React.useContext(GlobalContext);
  const { data: session, status } = useSession();
  const [search, setSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();
  const [icons, setIcons] = React.useState([]);
  const pages = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Support", url: "/support" },
    { name: "About", url: "/about" },
  ];

  React.useEffect(() => {
    const icons = [
      {
        src:
          session?.user.display_mode === 0
            ? "/icons/search_grey.png"
            : "/icons/search_grey.png", // experimenting with grey icons (would be able to remove all icon logic with display mode)
        alt: "Search",
        href: "#",
      },
      {
        src:
          session?.user.display_mode === 0
            ? "/icons/shoppingcart.png"
            : "/icons/lightmode/shoppingcart_white.png",
        alt: "Cart",
        href: "/cart",
      },
      {
        src:
          session?.user.display_mode === 0
            ? "/icons/account.png"
            : "/icons/lightmode/account_white.png",
        alt: "User",
        href: "/user/account",
      },
    ];
    setIcons(icons);
  }, [session?.user.display_mode, session, session?.user]);

  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm) {
      router.push(`/products?query=${searchTerm}`);
    }
  };

  const handleIconHref = (alt, href) => {
    if (alt === "User" && status === "authenticated") {
      return href;
    } else if (alt !== "User") {
      return href;
    } else {
      return "/user/login";
    }
  };

  return (
    <nav className={styles.Nav}>
      <h2 onClick={() => router.push("/")}>Something</h2>
      <ul>
        {pages.map((page) => (
          <li key={page.url}>
            <Link href={page.url}>{page.name}</Link>
          </li>
        ))}
      </ul>
      <div className={styles.icons}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          style={{
            width: search ? "200px" : "0",
            padding: !search && "0.6em 0",
          }}
          onKeyDown={handleSearch}
        />
        <div></div>
        {icons.map((icon) => (
          <Link
            key={icon.alt}
            href={handleIconHref(icon.alt, icon.href)}
            onClick={icon.alt === "Search" ? toggleSearch : undefined}
          >
            <Image
              priority
              src={icon.src}
              alt={icon.alt}
              width={30}
              height={30}
              aria-label={icon.alt}
            />
            {icon.href === "/cart" && (
              <div className={styles.cartCount}>{cart.length || cartCount}</div>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
