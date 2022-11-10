import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Enclos from "../../../../frontZoo/pages/enclos";

export default function ListEnclos({ posts, date }): JSX.Element {
	return (
		<main>
			<h2>{date}</h2>
			<ul>
				{posts.map((post) => (
					<Link key={post.id} href={`/enclos/${post.id}`}>
						<a>
							<li>
								{post.id} - {post.title}
							</li>
						</a>
					</Link>
				))}
			</ul>
		</main>
	);
}
export async function getStaticProps(){
	const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6').then((r) => r.json());
	return {
		props: {
			posts,
			date: new Date().toString(),
		},
	};
}