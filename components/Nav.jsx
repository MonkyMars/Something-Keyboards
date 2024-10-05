import React from "react";
import Link from "next/link";
import styles from "../styles/components/Nav.module.css";
import Image from "next/image";
import { useRouter } from 'next/router'; 
import GlobalContext from '../global/GlobalContext';

export default function Nav() {
  const { user, cart, cartCount } = React.useContext(GlobalContext);
  const [search, setSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();  
  const [cartLength, setCartLength] = React.useState(0);

  const pages = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Support", url: "/support" },
    { name: "About", url: "/about" },
  ];

  const icons = [
    { src: user.display_mode === 0 ? "/icons/search.png" : '/icons/lightmode/search_white.png', alt: "Search", href: "#" },
    { src: user.display_mode === 0 ? "/icons/shoppingcart.png" : '/icons/lightmode/shoppingcart_white.png', alt: "Cart", href: "/cart" },
    { src: user.display_mode === 0 ? "/icons/account.png" : '/icons/lightmode/account_white.png', alt: "User", href: "/user/account" },
  ];

  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm) {
      router.push(`/products?query=${searchTerm}`);
    }
  };

  return (
    <nav className={styles.Nav}>
      <h2 onClick={() => router.push('/')}>Something</h2>
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
          style={{ width: search ? "200px" : "0", padding: !search && "0.6em 0" }}
          onKeyDown={handleSearch}
        />
        <div>
          
        </div>
        {icons.map((icon) => (
          <Link
            key={icon.alt}
            href={icon.href === '/user/account' && user.email ? icon.href : '/user/login'}
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
            {icon.href === '/cart' && <div className={styles.cartCount}>{cartCount || cart.length}</div>}
          </Link>
        ))}
      </div>
    </nav>
  );
}
