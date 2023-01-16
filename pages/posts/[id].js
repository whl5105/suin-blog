import Head from 'next/head'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import CodeBlock from '../../components/CodeBlock'

//목록을 배열로 가져오기
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

//내용 을 가져오기
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700 rounded-lg px-5"
      onClick={() => alert('click test')}
    >
      {children}
    </button>
  )
}
const components = { Button, CodeBlock }

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) return <div>Loading...</div>
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </Layout>
  )
}
