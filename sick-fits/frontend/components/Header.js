import Link from 'next/Link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick fits</Link>
      </div>
      <Nav />
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </header>
  );
}
