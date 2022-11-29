import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';

export const getStaticPaths = async () => {
	const paths = getAllPostIds();

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
};

const Post = ({ postData }) => {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			{postData.title}
			<br />
			{postData.id}
			<br />
			<Date dateString={postData.date}></Date>
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
		</Layout>
	);
};

export default Post;
