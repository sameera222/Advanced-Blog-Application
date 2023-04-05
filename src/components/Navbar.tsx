import Link from "next/link";

const Navbar = () =>{
return (
<nav>
  <div>
    <Link href = '/' style={{ color: '#f1356d', textDecoration: 'none'}}>
      <span>Blogism</span>
    </Link>
  </div>
  <ul>
    <li>
      <Link href='/' style={{ color: '#f1356d', textDecoration: 'none'}}>
        <span>Home</span>
      </Link>
    </li>
    <li>
      <Link href='/NewBlog' style={{ color: '#f1356d', textDecoration: 'none'}} >
        <span>New Blog</span>
      </Link>
    </li>
    <li>
      <Link href='/post[id]' as='/post/1' style={{ color: '#f1356d', textDecoration: 'none'}} >
        <span>Post</span>
      </Link>
    </li>
    <li>
    <Link href='api/auth/logout' style={{ color: '#f1356d', textDecoration: 'none'}}><span>Logout</span></Link>
    </li>
  </ul>
  <style jsx>{`
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: white;
      color: #fff;
    }

    div {
      display: flex;
      align-items: center;
    }

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin-right: 1rem;
      text-decoration: none;
      list-style: none;

    }

    text-link {
      color: #fff;
      text-decoration: none;
      transition: color 0.2s ease-out;
    }

    span:hover {
      text-decoration: none;
      list-style: none;
    }

    span {
      cursor: pointer;
      font-weight: bold;
      font-size: 1.5rem;
    }
  `}</style>
</nav>
  );
  
}

export default Navbar;
