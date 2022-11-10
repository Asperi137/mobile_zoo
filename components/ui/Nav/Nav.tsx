import Link from 'next/link';


export default function Nav() {

	return (
		<nav>
			<ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0, gap: '1.5em' }}>
				<li>
					<Link href='/'>Connection</Link>
				</li>
				<li>
					<Link href='/enclos'>enclos</Link>
				</li>
				<li>
					<Link href='/evenements'>Evenement</Link>
				</li>
			</ul>
		</nav>
	);
}
