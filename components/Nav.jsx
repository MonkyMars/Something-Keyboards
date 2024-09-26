import React from "react";
import Link from "next/link";
import styles from "../styles/components/Nav.module.css";
import Image from "next/image";

export default function Nav() {
  const [search, setSearch] = React.useState(false); // Start with false for better toggle logic
  const [searchTerm, setSearchTerm] = React.useState(""); // State for search input

  const pages = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Support", url: "/support" },
    { name: "About", url: "/about" },
  ];

  const icons = [
    { src: "/icons/search.png", alt: "Search", href: "#" },
    { src: "/icons/shoppingcart.png", alt: "Cart", href: "/cart" },
    { src: "/icons/account.png", alt: "User", href: "/account" },
  ];

  const toggleSearch = () => {
    setSearch((prev) => !prev); // Toggle search state
  };

  return (
    <nav className={styles.Nav}>
      <h2>Something</h2>
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
          style={{ width: search ? "10%" : "0", padding: !search && "0.6em 0" }}
        />
        {icons.map((icon) => (
          <Link
            key={icon.alt}
            href={icon.href}
            onClick={icon.alt === "Search" ? toggleSearch : undefined}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={30}
              height={30}
              aria-label={icon.alt}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}
